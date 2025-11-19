# Fact vs Fiction: LLM Accuracy Test

GPT · Claude · Gemini 사실 정확도 & Hallucination 비교 프로젝트

---

## Goals (연구 목적)

- LLM별 정답률(Fact Accuracy) 비교  
- 부분정답(0.5점) 및 오류 패턴 분석  
- Hallucination 유형 자동 태깅  
- 카테고리별(정의/수치/최신정보 등) 성능 차이 확인  
- 모델별 강점·약점 도출 및 시각화


---


## Repository Structure

Fact-vs-Fiction-Test/
│
├── data/
│ ├── questions.csv # 28개 질문
│ ├── answers.csv # 정답 + 출처
│ ├── responses.csv # LLM별 응답
│ └── result_table.xlsx # 채점표
│
├── analysis/
│ ├── charts/ # 시각화 이미지
│ ├── hallucination_types.md # hallucination 기준 설명
│ └── analysis.ipynb # Python 노트북
│
├── images/ # README 삽입 이미지
│
└── README.md # 프로젝트 소개 문서



---



## Dataset Description

### questions.csv  
- 총 28문항  
- 7개 카테고리 × 4문항  

카테고리 목록:  
- fact (사실 기억)  
- numerical (수치 기반)  
- definition (정의 설명)  
- recent (최신 정보)  
- reasoning (다단계 추론)  
- comparison (비교)  
- misconception (흔한 오해)

---

### answers.csv  
- 모든 질문의 정답  
- 공식 출처 + URL 포함  
- numerical·recent 항목 최신 기준 반영  

---

### responses.csv  
- GPT / Claude / Gemini 응답을  
  동일 프롬프트 · 동일 temperature(0)로 수집  

---

## Experiment Methodology

1. **동일 조건 입력**  
   - 28개 질문  
   - 동일 프롬프트  
   - temperature=0  
   - 동일 system prompt 설정  

2. **채점 기준**

| 점수 | 의미 |
|------|------|
| 1.0  | 완전 정답 |
| 0.5  | 핵심 내용은 맞음 |
| 0.0  | 오답 / 허위 정보 포함 |

3. **Hallucination 자동 태깅 기준**  
- 사실 왜곡 (Distortion)  
- 존재하지 않는 정보 생성 (Fabrication)  
- 아는 척 단정형 답변 (Overconfidence)  

---

## Results Summary

(실험 후 charts 추가)

- 모델별 총 정답률  
- 카테고리별 정확도 비교  
- hallucination 발생 비율  
- reasoning / 최신 정보 영역 성능 차이  

---

## Key Insights

- GPT: 정의·비교 질문에서 가장 안정적  
- Claude: 계산·추론(reasoning)에 강점  
- Gemini: 최신 정보(recent)에서 상대적으로 취약  
- misconception 질문은 모든 모델에서 hallucination 발생 가능  

---

## Tools & Environment

- Python 3.10+  
- pandas / numpy  
- matplotlib / seaborn  
- OpenAI / Anthropic / Google API  
- Jupyter Notebook  

---

## Team Roles

| 역할 | 담당 업무 |
|------|-----------|
| 질문 데이터셋 | 28개 질문 구성, 카테고리 분류 |
| 정답 구축 | answers.csv 제작, 출처 정리 |
| 모델 응답 수집 | GPT / Claude / Gemini 응답 수집 |
| 분석·시각화 | 채점 코드, 그래프 분석 |
| GitHub 문서화 | README, 폴더 구조 정리 |

---

## Contact

프로젝트 관련 문의는 Issue 탭을 통해 남겨주세요.
