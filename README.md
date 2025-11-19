# Fact vs Fiction: LLM Accuracy Test (GPT · Claude · Gemini 사실 정확도 & Hallucination 비교 프로젝트)

본 프로젝트는 GPT, Claude, Gemini 등 주요 LLM을 대상으로 사실 기반 질문에 대한 정확도와 허위정보(hallucination) 생성률을 비교 분석하는 것을 목표로 한다.  각 모델의 응답을 정량적으로 평가하고, 유형별 오류를 분류하여 LLM의 신뢰성과 한계를 시각적으로 보여주는 연구 프로젝트이다.

🧠 Overview

이 프로젝트는 GPT, Claude, Gemini 등 주요 LLM이
사실 기반 질문에 대해 얼마나 정확한 답변을 제공하는지,
또 어떤 영역에서 hallucination이 발생하는지를 분석하는 실험입니다.

총 28개 질문, 7개 카테고리, 정답 데이터셋,
그리고 모델별 응답・채점・시각화 결과를 제공합니다.

🎯 Goals (연구 목적)

LLM별 정답률(Fact Accuracy) 비교

부분정답(0.5점) 및 오류 패턴 분석

Hallucination 유형 자동 태깅

카테고리별(정의/수치/최신정보 등) 성능 차이 확인

모델별 강점·약점 도출 및 시각화


📁 Repository Structure
Fact-vs-Fiction-Test/
│
├── data/
│   ├── questions.csv          # 28개 질문
│   ├── answers.csv            # 정답 + 출처
│   ├── responses.csv          # LLM별 응답
│   └── result_table.xlsx      # 채점표
│
├── analysis/
│   ├── charts/                # 시각화 이미지
│   ├── hallucination_types.md # hallucination 기준 설명
│   └── analysis.ipynb         # Python 분석 노트북
│
├── images/                    # README 삽입용 이미지
│
└── README.md                  # 프로젝트 소개 문서


🗂 Dataset Description
🔹 questions.csv
총 28문항

7개 카테고리 × 4개씩

카테고리:
fact (사실 기억)
numerical (수치 기반)
definition (정의 설명)
recent (최신 정보)
reasoning (다단계 추론)
comparison (비교)
misconception (흔한 오해)

🔹 answers.csv
모든 질문의 정답
공식 출처 + URL 첨부
numerical·recent 질문도 최신 기준 반영
활용: 자동 채점, hallucination 검출

🔹 responses.csv
GPT/Claude/Gemini 응답을 동일 프롬프트・temperature(0)로 수집

⚙️ Experiment Methodology

1) 동일 조건 입력
동일 질문 28개
동일 프롬프트
temperature=0
system prompt 동일 설정

2) 채점 기준
점수	의미
1.0	완전 정답
0.5	핵심 내용은 맞음
0.0	오답 / 허위정보 포함
3) Hallucination 자동 태깅

사실 왜곡 (Distortion)
존재하지 않는 정보 추가 (Fabrication)
“모르는데 아는 척 대답” (Overconfidence)

📊 Results Summary
아래 그래프는 /analysis/charts/ 폴더에서 확인 가능합니다.

모델별 총 정답률 비교
카테고리별 정확도
hallucination 비율 파이차트
최신 정보 / reasoning 질문에서의 오류 패턴 분석
비교(comparison) 질문에서의 구조화 능력 차이
(👉 실제 프로젝트 진행 후 그래프 추가)

🔍 Key Insights

GPT: definition·comparison 질문에서 가장 안정적
Claude: reasoning(다단계 계산)에서 높은 정확도
Gemini: 최신 정보(recent)에서 업데이트 지연으로 오류 발생
misconception(흔한 오해) 질문에서 모든 모델 hallucination 가능

특정 모델은 모호성 있는 질문에서 과잉 확신형 답변 생성 경향

🛠 Tools & Environment
Python 3.10+
pandas / numpy
matplotlib / seaborn
OpenAI / Anthropic / Google API
Jupyter Notebook

🧑‍🤝‍🧑 Team Roles
역할	담당 업무
질문 데이터셋	28개 질문 구성, 카테고리화
정답 구축	공식 출처 기반 answers.csv 제작
모델 응답 수집	GPT/Claude/Gemini 응답 수집 & 정리
분석/시각화	채점 코드, 그래프 생성
GitHub 정리	README, 폴더 구조, 문서화


