// 매일 아침 오늘의 스크럼 브리핑을 생성한다.
// 원본 문서를 복사하지 않고, 오늘 날짜에 해당하는 부분만 발췌해 한 문서로 조립한다.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");
const OUT_DIR = path.join(CONTENT, "07_스크럼");

const fmt = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric", month: "2-digit", day: "2-digit", weekday: "short",
});
const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]));
const ymd = `${parts.year}-${parts.month}-${parts.day}`;
const mmdd = `${parts.month}.${parts.day}`;
const weekday = parts.weekday;

const read = f => fs.readFileSync(f, "utf8");
const latest = (dir, pattern) =>
  fs.readdirSync(dir).filter(f => pattern.test(f)).sort().at(-1);

// 문서에서 시작 정규식부터 다음 경계 정규식 전까지 발췌
function extract(text, startRe, endRe) {
  const lines = text.split("\n");
  const start = lines.findIndex(l => startRe.test(l));
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (endRe.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start, end).join("\n").trim();
}

const sections = [];

// 1. 일일 체크리스트 — 오늘 섹션 + (전날 작성된) 오늘 작업 전 확인 항목
const checklistDir = path.join(CONTENT, "01_기획");
const checklistFile = latest(checklistDir, /일일_작업_체크리스트.*\.md$/);
if (checklistFile) {
  const text = read(path.join(checklistDir, checklistFile));
  const today = extract(text, new RegExp(`^### ${mmdd.replace(".", "\\.")}`), /^(### |## )/);
  const morningCheck = extract(
    text,
    new RegExp(`^\\*\\*.*\\(${mmdd.replace(".", "\\.")}\\) 작업 전 확인\\*\\*`),
    /^(\*\*|### |## )/,
  );
  const link = `../01_기획/${checklistFile}`;
  if (morningCheck) sections.push(`## 오늘 시작 전 확인\n\n${morningCheck.replace(/^\*\*.*\*\*\n?/, "").trim()}\n\n> 출처: [일일 작업 체크리스트](${encodeURI(link)})`);
  if (today) sections.push(`## 오늘 할 일\n\n${today.replace(/^### .*\n?/, "").trim()}\n\n> 출처: [일일 작업 체크리스트](${encodeURI(link)})`);
}

// 2. 최신 회의록 — 액션 아이템
const meetingDir = path.join(CONTENT, "05_회의록");
const meetingFile = latest(meetingDir, /^A2팀_\d{4}-\d{2}-\d{2}_회의록\.md$/);
if (meetingFile) {
  const text = read(path.join(meetingDir, meetingFile));
  const actions = extract(text, /^## 액션 아이템/, /^## /);
  if (actions) {
    const link = `../05_회의록/${meetingFile}`;
    sections.push(`${actions.replace(/^## 액션 아이템/, "## 액션 아이템 (최신 회의록)")}\n\n> 출처: [${meetingFile.replace(".md", "")}](${encodeURI(link)})`);
  }
}

// 3. 마일스톤 — 오늘 해당하는 리스크 체크포인트
const milestoneFile = latest(checklistDir, /주차별_마일스톤.*\.md$/);
if (milestoneFile) {
  const text = read(path.join(checklistDir, milestoneFile));
  const risk = extract(text, /^## 리스크 체크포인트/, /^## /);
  if (risk) {
    const rows = risk.split("\n").filter(l => l.includes(mmdd));
    if (rows.length) {
      const link = `../01_기획/${milestoneFile}`;
      sections.push(`## 오늘의 리스크 체크포인트\n\n| 시점 | 확인 항목 | 대응 |\n|------|---------|------|\n${rows.join("\n")}\n\n> 출처: [주차별 마일스톤](${encodeURI(link)})`);
    }
  }
}

// 4. 매일 확인하는 문서 바로가기
sections.push(`## 문서 바로가기

| 문서 | 용도 |
| --- | --- |
| [일일 작업 체크리스트](${encodeURI(`../01_기획/${checklistFile ?? ""}`)}) | 오늘·내일 작업 전체 |
| [최신 회의록](${encodeURI(`../05_회의록/${meetingFile ?? ""}`)}) | 결정 사항·확인 필요 항목 |
| [주차별 마일스톤](${encodeURI(`../01_기획/${milestoneFile ?? ""}`)}) | 주차 목표·리스크 |
| [문서 통합 사이트](https://framewave-labs.github.io/framewave-docs/) | 팀 전체 필독·최종본 |`);

// 5. 회의록용 참고 문서 블록 — 오늘 브리핑에 포함된 문서를 회의록의 "참고 문서" 섹션에 그대로 복사해 쓴다
const refDocs = [
  checklistFile && `| \`${checklistFile}\` |  |`,
  meetingFile && `| \`${meetingFile}\` |  |`,
  milestoneFile && `| \`${milestoneFile}\` |  |`,
].filter(Boolean);
sections.push(`## 회의록용 참고 문서 블록

오늘 회의록을 쓸 때 아래 표를 "참고 문서" 섹션에 복사하고, 오늘 실제로 참고한 문서만 남긴 뒤 오른쪽 칸을 채운다. 오늘 새로 참고한 문서가 있으면 행을 추가한다.

\`\`\`markdown
## 참고 문서

| 문서 | 오늘 참고/반영한 내용 |
| --- | --- |
${refDocs.join("\n")}
\`\`\``);

const doc = `---
title: 오늘의 스크럼
author: scy
category: 07_스크럼
status: draft
created: ${ymd}
updated: ${ymd}
document_group: scrum
current: true
tags:
  - A2팀
  - 스크럼
  - 데일리
summary_target: false
---

# 오늘의 스크럼 — ${ymd} (${weekday})

> 이 문서는 매 근무일 아침 07:00(KST)에 자동 생성됩니다. 직접 수정하지 마세요.
> 원본을 고치면 다음 생성 때 자동 반영됩니다.

${sections.join("\n\n---\n\n")}
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "오늘의_스크럼.md"), doc);
console.log(`generated: content/07_스크럼/오늘의_스크럼.md (${ymd}, sections: ${sections.length})`);
