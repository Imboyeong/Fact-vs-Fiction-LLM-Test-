# Fact vs Fiction: LLM Accuracy Test
### GPT-4o vs Claude-3.5-Sonnet vs Gemini-1.5-Pro  
**사실 정확도(Fact Accuracy) & 환각(Hallucination) 비교 분석 프로젝트**

![Python](https://img.shields.io/badge/Python-3.8%2B-blue) ![Data Analysis](https://img.shields.io/badge/Analysis-Pandas%20%7C%20Matplotlib-orange) ![Status](https://img.shields.io/badge/Status-Completed-success)

---

## 📖 Project Overview
본 프로젝트는 주요 거대언어모델(LLM) 3종의 **한국어 사실 정확도(Fact Accuracy)**를 정량적으로 비교하고, **환각(Hallucination) 패턴**을 분석하기 위해 수행되었습니다.  
단순한 정답 여부를 넘어, 부분 점수와 치명적 오류(Factual Error)를 구분하는 **독자적인 채점 로직**을 설계하여 모델의 신뢰성을 검증했습니다.

---

## 🎯 Goals (연구 목적)
- **정답률 비교:** 주요 LLM 모델별 Fact Accuracy 정량적 비교  
- **오류 분석:** 부분 정답(0.5점) 및 오답 패턴 심층 분석  
- **Hallucination 태깅:** 사실 왜곡·정보 조작 등 환각 유형 자동 분류  
- **카테고리별 성능:** 정의, 수치, 최신 정보, 추론 등 영역별 성능 차이 확인  
- **시각화:** 모델별 강점·약점 도출 및 인터랙티브 대시보드 구현  

---

## 📂 Repository Structure
```bash
Fact-vs-Fiction-Test/
│
├── data/
│   ├── questions.csv        # 32개 질문 (8개 카테고리 × 4문항)
│   ├── answers.csv          # 정답 및 공식 출처 (Ground Truth)
│   ├── responses.csv        # 3개 모델(GPT, Claude, Gemini) 응답 데이터
│   └── result_table.xlsx    # 최종 채점 결과표
│
├── analysis/
│   ├── llm_scoring_functions.py   # [Core] 특수 로직 포함 자동 채점 파이썬 코드
│   ├── llm_scoring_methodology.md # [Docs] 상세 채점 기준 및 수식 문서
│   ├── llm_scoring_flowchart.md   # [Docs] 채점 로직 흐름도
│   ├── analysis.ipynb             # 데이터 분석 및 시각화 노트북
│   └── charts/                    # 생성된 그래프 이미지 폴더
│
├── dashboard/
│   └── llm_performance_dashboard.html # [Web App] 인터랙티브 결과 분석 대시보드
│
└── README.md
````

---

## 🚀 Installation & Usage

### 1. 환경 설정 (Prerequisites)

```bash
pip install pandas matplotlib seaborn openpyxl
```

### 2. 데이터 준비

`data/` 폴더 내에 `responses.csv`, `answers.csv` 파일이 위치해야 합니다.

### 3. 분석 코드 실행

```bash
# 한글 폰트 설정 및 채점 실행
python analysis/llm_scoring_functions.py
```

### 4. 대시보드 확인

`dashboard/llm_performance_dashboard.html` 파일을 브라우저로 실행합니다.

---

## 📝 Dataset Description

총 **32문항 (8카테고리 × 4문항)**으로 구성된 자체 구축 데이터셋을 사용했습니다.

### 1) Questions (questions.csv)

* fact / simple: 일반 사실 기억
* numerical: 수치 기반 정보 (연도, 금액 등)
* definition: 개념 정의 및 설명
* recent: 최신 정보 (2024/2025 기준)
* reasoning: 다단계 논리 추론
* comparison: 대상 간 비교
* misconception: 오해 및 상식 검증
* medical / practical: 실생활·전문 지식

### 2) Ground Truth (answers.csv)

* 공식 문서·뉴스 등 **신뢰성 높은 출처 URL 포함**
* numerical·recent 문항은 최신 정보 기준 반영

---

## 🧪 Experiment Methodology & Core Logic

### 1. 채점 기준 (Scoring Rules)

| 점수      | 의미    | 기준                   |
| ------- | ----- | -------------------- |
| **1.0** | 완전 정답 | 사실·수치·논리 모두 정확       |
| **0.5** | 부분 정답 | 핵심은 맞으나 정보 누락 또는 불완전 |
| **0.0** | 오답/환각 | 사실 오류, 답변 거부, 논리 결함  |

---

### 2. 핵심 채점 로직 (Core Scoring Code)

답변 표기가 서로 다른 경우("3천만 원" vs "30,000,000")를 정규화하고,
문항 유형별 조건부 매칭을 수행하는 고급 로직입니다.

```python
import re

def calculate_score(q_id, response, ground_truth_db):
    """
    LLM 응답을 정규화하고, 문항 유형(Type)에 따라 차등 배점(0.0 / 0.5 / 1.0)을 부여
    """
    response_lower = str(response).strip().lower()
    q_data = ground_truth_db.get(q_id, {})
    q_type = q_data.get("type", "simple")
    score = 0.0

    # [Case 1] Numerical / Range
    if q_type == "range" or q_id in [7, 8, 17]:
        response_normalized = str(response).replace("만", "0000").replace("천", "000")
        response_numbers = re.findall(r'\d+', response_normalized.replace(",", ""))
        response_ints = [int(num) for num in response_numbers]

        if q_id == 17:
            m_min, m_max = q_data["monthly_salary_range"]
            n_min, n_max = q_data["net_salary_range"]
            monthly_ok = any(m_min <= num <= m_max for num in response_ints)
            net_ok = any(n_min - 100 <= num <= n_max + 100 for num in response_ints)
            if monthly_ok and net_ok: score = 1.0
            elif monthly_ok or net_ok: score = 0.5

    # [Case 2] Multi-condition Logic
    elif q_id == 24:
        norm_keywords = q_data["normalization_required"]
        std_keywords = q_data["standardization_required"]
        
        norm_ok = sum(1 for k in norm_keywords if k.lower() in response_lower) >= 2
        std_ok = sum(1 for k in std_keywords if k.lower() in response_lower) >= 2
        
        if norm_ok and std_ok: score = 1.0
        elif norm_ok or std_ok: score = 0.5

    # [Case 3] 기본형
    else:
        correct_list = q_data.get("correct", [])
        partial_list = q_data.get("partial", [])
        
        is_correct = any(str(k).lower() in response_lower for k in correct_list)
        is_partial = any(str(k).lower() in response_lower for k in partial_list)
        
        if is_correct: score = 1.0
        elif is_partial: score = 0.5

    return score
```

---

### 3. 특수 감점 로직 (Special Penalty Logic)

아래 유형은 **무조건 0점 처리**

* Factual Error: 존재하지 않는 사실을 생성
* Recent Fact Fail: 최신성 결함
* Logic Flaw: 비교·추론 구조 파괴

---

## 📊 Results Summary

대시보드: **dashboard/llm_performance_dashboard.html**

### 🏆 모델별 종합 순위

| 순위                   | 모델   | 종합 점수   | 오류(Factual / Partial)  | 비고 |
| -------------------- | ---- | ------- | ---------------------- | -- |
| **1위 🥇 GPT-4o**     | 0.81 | 4건 / 4건 | 가장 안정적·균형 잡힌 성능        |    |
| **2위 🥈 Gemini-1.5** | 0.80 | 5건 / 3건 | 최신 정보 처리 우수, Hard 난 강점 |    |
| **3위 🥉 Claude-3.5** | 0.75 | 6건 / 4건 | 비교·추론 취약, 사실 오류 빈도 높음  |    |

## 📊 모델별 요약: 정확도와 안정성
아래는 GPT, Gemini, Claude의 정확도·안정성 비교입니다.

![Model Summary](./analysis/charts/model_summary.png)

## 📌 핵심 요약 (Key Findings)
분석한 결과의 주요 인사이트를 시각화한 화면입니다.

![Key Findings](./analysis/charts/key_findings.png)

---

## ⚠️ Limitations & Future Work

### 🔹 키워드 매칭의 한계

* *Current:* 단순 포함 여부 기반 결정론적 평가
* *Future:* **LLM-as-a-Judge** 방식 적용, 의미적 유사도 기반 평가 고도화

### 🔹 데이터셋 규모

* *Current:* 32문항
* *Future:* 300+ 문항으로 확장 예정

### 🔹 검색 여부 분리 평가

* 검색 허용 vs 비허용 모드 비교
* 다국어 평가 추가 예정

---

## 👥 Team Roles

| 이름  | 역할            | 상세 업무                   |
| --- | ------------- | ----------------------- |
| 임보영 | 데이터셋 구축 & 기획  | 질문·정답 구축, 스토리라인 기획, 피피티 전체 흐름   |
| 최희조 | 데이터 수집 & 인사이트 | 모델 응답 수집, 피피티 시사점 보완  |
| 최은연 | 분석·개발 & 문서화   | 자동 채점 코드 개발·시각화 |
