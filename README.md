# LLM StudyHub

<div align="center">

[![Website](https://img.shields.io/badge/🌐_Website-llmstudyhub--test.vercel.app-4285f4?style=for-the-badge)](https://llmstudyhub-test.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/Imboyeong/Fact-vs-Fiction-LLM-Test-?style=for-the-badge&logo=github&color=yellow)](https://github.com/Imboyeong/Fact-vs-Fiction-LLM-Test-)

### GPT·Gemini·Claude, 비교하고 바로 쓰는 학습 허브
**Compare and Choose: Your LLM Learning Hub**

---

**🇰🇷 LLM 비교 연구 기반 학습 지원 웹 애플리케이션**

GPT-4o, Gemini 2.0 Flash, Claude 4.5 Sonnet의 정확도 분석을 토대로  
학생들이 목적에 맞는 최적 모델을 선택하고 활용할 수 있도록 돕는 플랫폼을 제안합니다.

**🌍 Research-Based LLM Learning Platform Proposal**

A proposed platform built on accuracy analysis of GPT-4o, Gemini 2.0 Flash and Claude 4.5 Sonnet   
designed to help students select and utilize the optimal AI model for their learning goals.

---

[🚀 **웹사이트 방문 Visit Website**](https://llmstudyhub-test.vercel.app) · [📄 **연구 보고서 Research Report**](https://github.com/Imboyeong/Fact-vs-Fiction-LLM-Test-/blob/main/Fact-vs-Fiction-LLM-Report.pdf)

</div>

---

## 📚 프로젝트 소개

**LLM StudyHub**는 학생들이 목적에 맞는 LLM 모델을 쉽게 선택하고 활용할 수 있도록 돕는 웹 애플리케이션입니다.

### 주요 기능
- 🤖 **채팅 모드**: 선택한 AI 모델과 대화
- ⚖️ **비교 모드**: GPT-4o, Gemini 2.0 Flash, Claude 4.5 Sonnet 동시 비교
- 💡 **추천 시스템**: 문제 유형별 최적 모델 자동 추천
- 🛤️ **학습 경로**: 과제별 단계별 가이드 제공

---

## 🚀 실행 방법

### 1. 필수 프로그램 설치
먼저 **Node.js**가 설치되어 있어야 합니다. ([nodejs.org](https://nodejs.org/)에서 설치)

### 2. 패키지 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev:client
```

### 4. 웹사이트 접속
브라우저에서 `http://localhost:5001/` 접속

---

## 📂 프로젝트 구조
- `client/src`: React 소스 코드
- `client/src/pages`: 주요 페이지 (채팅, 비교 등)
- `client/src/components`: UI 컴포넌트
- `client/src/lib`: 데이터 및 유틸리티

---

## 🔬 연구 배경: Fact vs Fiction LLM Test

이 프로젝트는 **한양대학교** *인간-인공지능협업제품서비스설계* 과목의 기말 프로젝트에서 수행한  
**LLM 모델 비교 실험 연구**의 인사이트를 바탕으로 제작되었습니다.

### 연구 목적
한국어 환경에서 주요 LLM(GPT · Claude · Gemini)이  
**얼마나 사실 기반으로 정확하게 답변하는지** 검증하기 위해:
- 텍스트 + 이미지 기반 벤치마크 데이터셋 설계
- 정확도(Accuracy), 부분점수, 치명적 오류(Factual Error) 분석
- Hallucination 패턴 및 난이도·문항 유형별 성능 차이 분석

### 실험 결과

| 순위 | 모델 | 종합 점수 | 오류(Factual / Partial) | 비고 |
|-----|------|----------|----------------------|------|
| 1위 | GPT-4o | 0.81 | 4 / 4 | 안정적·균형적 |
| 2위 | Gemini 2.0 Flash | 0.80 | 5 / 3 | 최신 정보 강점 |
| 3위 | Claude 4.5 Sonnet | 0.75 | 6 / 4 | 비교·추론 취약 |

자세한 분석 결과는 [Fact-vs-Fiction LLM Report (PDF)](https://github.com/Imboyeong/Fact-vs-Fiction-LLM-Test-/blob/main/Fact-vs-Fiction-LLM-Report.pdf)를 참고하세요.

---

## 👥 팀 소개

| 이름 | 역할 | 상세 업무 |
|-----|------|----------|
| 임보영 | 데이터셋 구축 & 기획 | 질문·정답 구축, 전체 흐름 총괄, 웹 사이트 구축 |
| 최희조 | 데이터 수집 & 인사이트 | 모델 응답 수집, 발표 |
| 최은연 | 분석·개발 & 문서화 | 자동 채점 코드, 시각화 , 결론 및 시사점 도출 |

---

## ⭐ Star를 눌러주세요!

이 프로젝트가 도움이 되셨다면 ⭐️ 한 번 눌러주세요!  
여러분의 관심과 응원이 큰 힘이 됩니다 🙏

If this project was helpful to you, feel free to hit the ⭐ button!
Your support and interest mean a lot 🙏
---

## 📄 라이선스

© 2025 LLM StudyHub. All rights reserved.
