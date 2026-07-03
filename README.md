# scy

`scy`는 Framewave Labs의 개인 문서 작성 저장소입니다.

이 저장소는 사람이 직접 작성하는 원본 문서를 보관하는 공간이고, 통합 요약과 배포는 별도 통합본 저장소(`framewave-docs`)에서 처리하는 것을 기준으로 합니다.

## 역할

- `scy`: 개인 원본 문서 작성 및 수정
- `lsg`: 다른 팀원의 개인 원본 문서 작성 및 수정
- `framewave-docs`: 문서 수집, 통합 요약, Quartz 빌드, GitHub Pages 배포

개인 저장소에서는 문서를 꾸준히 작성하고 커밋하는 데 집중합니다. 통합 요약본은 직접 수정하지 않고 자동 생성 결과물로 관리합니다.

## 폴더 구조

```text
content/
├─ 01_기획/
├─ 02_리서치/
├─ 03_엔지니어링/
├─ 04_QA/
├─ 05_회의록/
└─ 06_참고자료/

templates/
├─ 문서_템플릿.md
└─ 회의록_템플릿.md
```

## 카테고리

| 폴더 | 용도 |
| --- | --- |
| `01_기획` | 서비스 방향성, 사용자 시나리오, MVP 범위 |
| `02_리서치` | 경쟁 서비스, 시장, 기술, 비용 조사 |
| `03_엔지니어링` | 아키텍처, API, DB, 배포, 구현 메모 |
| `04_QA` | 테스트 체크리스트, 검수 결과, 이슈 정리 |
| `05_회의록` | 회의록, 의사결정, 액션 아이템 |
| `06_참고자료` | 참고 링크, 원문 자료, 임시 조사 자료 |

## 파일명 규칙

문서 파일명은 날짜와 주제를 함께 적습니다.

```text
YYYY-MM-DD_문서주제.md
```

회의록은 팀별로 모아 보기 쉽도록 아래 규칙을 사용합니다.

```text
팀명_YYYY-MM-DD_회의록.md
```

예시:

```text
2026-06-29_서비스_방향성.md
2026-06-29_API_비용산정.md
A2팀_2026-07-01_회의록.md
```

## 문서 메타데이터

모든 주요 문서에는 아래 frontmatter를 넣습니다.

```md
---
title: 문서 제목
author: scy
category: 01_기획
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
version: v0.1
document_group: 문서그룹
current: true
tags:
  - 태그
summary_target: true
---
```

`summary_target: true`는 통합본 저장소에서 자동 요약 대상으로 삼을 문서를 구분하기 위한 값입니다. 참고자료나 임시 메모처럼 요약에서 제외할 문서는 `false`로 둡니다.

## 상태값

- `draft`: 작성 중
- `review`: 리뷰 필요
- `final`: 확정
- `superseded`: 더 최신 문서가 있어 현재 기준에서는 제외
- `archived`: 보관

## 문서 버전관리 규칙

초안도 작업 이력이므로 삭제하지 않습니다. 대신 문서마다 `version`, `document_group`, `current`, `summary_target` 값을 둬서 최신본과 이전 버전을 구분합니다.

### 기본 원칙

| 원칙 | 설명 |
| --- | --- |
| 초안도 보관 | 초안은 삭제하지 않고 작업 이력으로 남깁니다. |
| 최신본만 요약 | 통합본에 반영할 문서만 `summary_target: true`로 둡니다. |
| 문서 그룹 관리 | 같은 성격의 문서는 같은 `document_group`으로 묶습니다. |
| 이전 버전 표시 | 최신본이 생기면 이전 문서는 `superseded`로 바꿉니다. |
| 원문 보존 | 프로젝트 명세서, Notion 원본, 빈 문서는 `archived`로 보관합니다. |

### 최신본과 이전 버전 구분

| 구분 | 기준 |
| --- | --- |
| 최신 기준 문서 | `current: true`, `summary_target: true` |
| 이전 버전 / 초안 | `current: false`, `status: superseded`, `summary_target: false` |
| 원문 보관 / 빈 문서 | `current: false`, `status: archived`, `summary_target: false` |
| 큰 방향 변경 | 새 문서를 만들고 이전 문서에는 `superseded_by`를 적습니다. |
| 작은 수정 | 같은 문서의 `updated`와 `version`만 올립니다. |

### Frontmatter 필드

| 필드 | 의미 |
| --- | --- |
| `version` | 문서 버전 |
| `document_group` | 같은 계열 문서를 묶는 이름 |
| `current` | 현재 기준 문서인지 여부 |
| `summary_target` | 통합 요약에 반영할지 여부 |
| `superseded_by` | 이전 버전이 어떤 최신 문서로 대체됐는지 |

### 상태값 기준

| status | 의미 | 사용 예 |
| --- | --- | --- |
| `draft` | 작성 중 | 개발팀 협의 전 API 검토 메모 |
| `review` | 팀 공유 또는 검토 가능한 상태 | PRD, MVP 평가 기준 |
| `final` | 확정된 운영 규칙 | README의 문서 버전관리 규칙 |
| `superseded` | 최신 문서가 따로 있어 기준에서 제외 | 초기 기획서 초안 |
| `archived` | 원문 보관 또는 빈 문서 | 프로젝트 명세서, Notion 원본 |

### 버전 번호 기준

| 버전 | 의미 |
| --- | --- |
| `v0.x` | 초안, 사전 정리, 실험 문서 |
| `v1.0` | 현재 팀 기준으로 공유 가능한 문서 |
| `v1.x` | 같은 방향 안에서 보완한 문서 |
| `v2.0` | 입력 방식, 평가 기준, 배포 전략처럼 큰 기준이 바뀐 문서 |

### 현재 문서 그룹

| document_group | 최신 문서 |
| --- | --- |
| `prd` | `content/01_기획/2026-06-24_생성형_AI_통합_엔진_PRD.md` |
| `evaluation` | `content/01_기획/2026-06-24_MVP_기능_범위_및_평가_기준.md` |
| `service_direction` | `content/01_기획/2026-06-24_서비스_방향성_정리.md` |
| `work_scope` | `content/01_기획/2026-06-26_A2팀_작업범위_정리.md` |
| `project_direction` | `content/01_기획/2026-06-26_A2팀_프로젝트_방향_정리.md` |
| `prompt_guide` | `content/01_기획/2026-06-24_프롬프트_가이드_초안.md` |
| `role_plan` | `content/01_기획/2026-06-24_역할별_1주차_작업.md` |
| `cost` | `content/02_리서치/2026-06-25_API_비용_산정.md` |
| `engineering` | `content/03_엔지니어링/2026-07-03_A2팀_API_DB_명세서.md` |
| `qa` | `content/04_QA/2026-06-30_A2팀_QA_평가_기준.md` |
| `risk` | `content/04_QA/2026-06-30_A2팀_리스크_및_오픈이슈.md` |

### 작업 흐름

1. 새 기준 문서가 필요하면 기존 파일을 무작정 덮어쓰지 않습니다.
2. 같은 문서의 작은 보완이면 `updated`와 `version`을 올립니다.
3. 방향이 크게 바뀌면 새 문서를 만들거나 최신 문서를 `v2.0`으로 올립니다.
4. 이전 문서는 `status: superseded`, `current: false`, `summary_target: false`로 바꿉니다.
5. 이전 문서에 `superseded_by`를 적어 최신 문서로 이어지게 합니다.

## 커밋 메시지

문서 작업은 아래 형식을 권장합니다.

```text
docs: 서비스 방향성 문서 추가
docs: API 비용 산정 문서 수정
research: 경쟁 서비스 분석 추가
meeting: 킥오프 회의록 추가
qa: 테스트 체크리스트 추가
```

## 작성 흐름

1. `templates/`에서 알맞은 템플릿을 복사합니다.
2. `content/` 아래 적절한 카테고리에 문서를 저장합니다.
3. frontmatter의 `title`, `category`, `status`, `created`, `updated`, `version`, `document_group`, `current`, `tags`를 채웁니다.
4. 통합 요약 대상이면 `summary_target: true`를 유지합니다.
5. 이전 문서를 대체하는 경우 이전 문서의 `status`, `current`, `summary_target`, `superseded_by`를 갱신합니다.
6. 작업 단위별로 커밋합니다.
