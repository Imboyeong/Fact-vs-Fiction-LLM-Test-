## Fact vs Fiction: LLM Accuracy Test
### GPT-5 vs Claude-4.0-Sonnet vs Gemini-2.5-Flash  
한국어 사실 정확도(Fact Accuracy) & 환각(Hallucination) 비교 분석 프로젝트

---

### Project Overview

AI 모델의 활용 범위가 빠르게 확장됨에 따라, **프로젝트 목적에 맞는 최적의 LLM을 선택하는 일**이 더욱 중요해지고 있습니다.
본 프로젝트는 GPT, Gemini, Claude 등 주요 LLM 3종을 **동일한 조건에서 정량적으로 비교·평가**하여,
각 모델이 **어떤 상황에서 강점을 보이고, 어떤 사용자·업무 환경에 적합한지**까지 심층적으로 분석합니다.

또한, 한국어 기반 질문을 대상으로 **사실 정확도(Fact Accuracy)** 를 비교하고,
모델별 **환각(Hallucination) 발생 패턴**을 분석하기 위해 프로젝트를 설계했습니다.
단순 정답 여부를 평가하는 데 그치지 않고, **부분 정답·치명적 오류(Factual Error)** 를 구분하는
독자적인 채점 로직을 구축해 각 모델의 **신뢰성과 실제 활용 가능성**을 검증했습니다.

---

### Goals (연구 목적)
- 정답률 비교: 주요 LLM 모델별 Fact Accuracy 정량 비교  
- 오류 분석: 부분 정답(0.5점) 및 오답 패턴 심층 분석  
- Hallucination 태깅: 사실 왜곡·정보 조작 등 환각 유형 자동 분류  
- 카테고리별 성능: 정의·수치·최신 정보·추론 등 영역별 성능 비교  
- 시각화: 모델별 강점·약점 도출 및 대시보드 구현  

---

### Repository Structure
```

Fact-vs-Fiction-Test/
│
├── data/
│   ├── questions.csv            # 32개 질문 (8카테고리 × 4문항)
│   ├── answers.csv              # 정답 및 공식 출처 (Ground Truth)
│   ├── responses.csv            # 3개 모델(GPT, Claude, Gemini) 응답
│   └── result_table.xlsx        # 최종 채점 결과표
│
├── analysis/
│   ├── llm_scoring_functions.py     # 자동 채점 파이썬 코드
│   ├── llm_scoring_methodology.md   # 채점 기준 설명
│   ├── llm_scoring_flowchart.md     # 채점 로직 흐름도
│   ├── analysis.ipynb               # 데이터 분석·시각화
│   └── charts/                      # 생성된 그래프 이미지
│
├── dashboard/
│   └── llm_performance_dashboard.html  # 웹 기반 대시보드
│
└── README.md

````

---

### Installation & Usage

#### 1. 환경 설정
```bash
pip install pandas matplotlib seaborn openpyxl
````

#### 2. 데이터 준비

`data/` 폴더 내에 `responses.csv`, `answers.csv`가 있어야 합니다.

#### 3. 분석 코드 실행

```bash
python analysis/llm_scoring_functions.py
```

#### 4. 대시보드 확인

`dashboard/llm_performance_dashboard.html`을 브라우저로 실행합니다.

---

### Dataset Description

총 32문항 (8카테고리 × 4문항) 구성.

#### 1) Questions (questions.csv)

* fact (사실)
* numerical (수치 기반)
* definition (정의 설명)
* recent (최신 정보)
* reasoning (추론)
* comparison (비교)
* misconception (오해)
* image (이미지 이해)

#### 2) Ground Truth (answers.csv)

* 공식 문서·뉴스 등 신뢰 가능한 출처 포함
* numerical·recent 문항은 최신 정보 기준 반영

---

### Experiment Methodology & Core Logic

#### 채점 구조
![채점 구조](./채점%20구조.png)


##### 1. 채점 기준

| 점수  | 의미    | 기준                  |
| --- | ----- | ------------------- |
| 1.0 | 완전 정답 | 사실·수치·논리 모두 정확      |
| 0.5 | 부분 정답 | 핵심은 맞으나 일부 누락       |
| 0.0 | 오답/환각 | 사실 오류, 답변 거부, 논리 결함 |

##### 2. 핵심 채점 로직 (Python)

```python
import re

def calculate_score(q_id, response, ground_truth_db):
    response_lower = str(response).strip().lower()
    q_data = ground_truth_db.get(q_id, {})
    q_type = q_data.get("type", "simple")
    score = 0.0

    # Case 1: Numerical / Range
    if q_type == "range" or q_id in [7, 8, 17]:
        response_normalized = str(response).replace("만", "0000").replace("천", "000")
        response_numbers = re.findall(r'\d+', response_normalized.replace(",", ""))
        response_ints = [int(num) for num in response_numbers]

        if q_id == 17:
            m_min, m_max = q_data["monthly_salary_range"]
            n_min, n_max = q_data["net_salary_range"]
            monthly_ok = any(m_min <= num <= m_max for num in response_ints)
            net_ok = any(n_min - 100 <= num <= n_max + 100 for num in response_ints)
            if monthly_ok and net_ok:
                score = 1.0
            elif monthly_ok or net_ok:
                score = 0.5

    # Case 2: Multi-condition Logic
    elif q_id == 24:
        norm_keywords = q_data["normalization_required"]
        std_keywords = q_data["standardization_required"]

        norm_ok = sum(1 for k in norm_keywords if k.lower() in response_lower) >= 2
        std_ok = sum(1 for k in std_keywords if k.lower() in response_lower) >= 2

        if norm_ok and std_ok:
            score = 1.0
        elif norm_ok or std_ok:
            score = 0.5

    # Case 3: 기본형
    else:
        correct_list = q_data.get("correct", [])
        partial_list = q_data.get("partial", [])

        is_correct = any(str(k).lower() in response_lower for k in correct_list)
        is_partial = any(str(k).lower() in response_lower for k in partial_list)

        if is_correct:
            score = 1.0
        elif is_partial:
            score = 0.5

    return score
```

##### 3. 특수 감점 로직

* Factual Error: 존재하지 않는 사실 생성
* Recent Fact Fail: 최신 정보 실패
* Logic Flaw: 비교·추론 구조 파괴

---

### Results Summary

#### 대시보드

`dashboard/llm_performance_dashboard.html`

#### 모델별 종합 순위

| 순위 | 모델         | 종합 점수 | 오류(Factual / Partial) | 비고       |
| -- | ---------- | ----- | --------------------- | -------- |
| 1위 |Gpt 3.5     | 0.81  | 4 / 4                 | 안정적·균형적  |
| 2위 |Gemini flash | 0.80  | 5 / 3                 | 최신 정보 강점 |
| 3위 |Claude Sonnet4.5 | 0.75  | 6 / 4                 | 비교·추론 취약 |

---

### 모델별 요약 이미지

```
***********확인해볼 것 이미지 넣을 건지 안넣을건지
```

---

### Key Findings

모델별 성능의 핵심 인사이트를 시각화하여 정리했습니다.
***********확인해볼 것 이미지 넣을 건지 안넣을건지
---

### Limitations & Future Work

* 키워드 기반 매칭의 한계 → 의미 기반 평가로 확장 예정
* 데이터셋 32문항 → 300+ 문항 확장 계획
* 검색 허용 vs 비허용 평가 분리
* 다국어 실험 추가 예정

---

### Team Roles

| 이름  | 역할            | 상세 업무                |
| --- | ------------- | -------------------- |
| 임보영 | 데이터셋 구축 & 기획  | 질문·정답 구축, 스토리라인 기획, 피피티 전체 흐름 총괄   |
| 최희조 | 데이터 수집 & 인사이트 | 모델 응답 수집, 피피티 시사점 총괄, 홍보      |
| 최은연 | 분석·개발 & 문서화   | 자동 채점 코드 개발, 시각화 |

---
