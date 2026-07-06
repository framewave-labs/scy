---
title: AWS·Vercel 결제 요청안
author: 손찬용 PM
category: 06_참고자료
status: draft
created: 2026-07-06
updated: 2026-07-06
tags:
  - AWS
  - Vercel
  - 결제
  - 계정
  - 결제요청
summary_target: false
---

# AWS·Vercel 결제 요청안
> 작성일: 2026-07-06 | 작성자: 손찬용 PM
> 회사 결제팀과 협의하기 위한 AWS 및 Vercel 결제/계정 운영 요청안

---

## 1. 요청 목적
A2팀은 현재 AWS와 Vercel을 사용해 서비스 개발 및 배포를 진행할 예정이며, 결제수단 등록과 비용 책임 주체를 개인이 아닌 회사 기준으로 정리할 필요가 있다. 특히 인턴 팀이 개인 계정에 회사 결제를 연결하는 방식은 소유권, 권한 회수, 인수인계, 결제 책임 분리 측면에서 리스크가 있어 회사 소유 계정 또는 회사가 관리하는 팀 계정 방식이 적절하다. [cite:169][cite:170]

---

## 2. AWS 요청안

### 2-1. 권장 계정 방식
AWS는 개인 계정을 만들어 결제만 연결하는 방식보다, 회사가 소유한 AWS 계정 또는 회사 AWS Organizations에 연결된 멤버 계정을 제공받아 사용하는 방식이 적절하다. AWS Organizations에서는 관리 계정이 멤버 계정들의 청구를 통합 결제하므로, 회사 차원에서 비용 관리와 권한 회수가 더 용이하다. [cite:169][cite:170]

### 2-2. 권장 결제 방식
초기 개발 및 검증 단계에서는 AWS 사용량 폭을 보수적으로 통제하기 위해 100달러 수준의 Advance Pay 선결제 검토가 적절하다. AWS Advance Pay는 계정에 자금을 미리 넣어 두고, 이후 발생하는 인보이스를 자동으로 해당 잔액에서 결제하는 구조다. [cite:175][cite:150]

### 2-3. 왜 선결제를 권장하는가
현재 팀은 인턴 중심으로 운영되고 있고, 실제 사용량 패턴이 아직 고정되지 않았기 때문에 초기에는 후불보다 선결제가 내부 승인과 예산 통제 측면에서 설명이 쉽다. 다만 AWS의 기본 청구 구조는 후불이며, Advance Pay도 결국 인보이스를 선충전 잔액으로 자동 납부하는 방식이므로 장기 운영 단계에서는 후불 + 예산 알림 구조로 전환 검토가 가능하다. [cite:175][cite:52]

### 2-4. 결제팀 요청 사항
- 회사 소유 AWS 계정 또는 AWS Organizations 멤버 계정 제공 요청
- 회사 측 결제수단 또는 결제 프로필 관리 요청
- 가능 시 100달러 Advance Pay 선충전 검토 요청
- AWS Billing 및 Budgets 확인 권한은 회사/관리자 기준으로 유지하고, 실무 팀은 필요한 서비스 권한만 받는 구조 요청 [cite:169][cite:175]

---

## 3. Vercel 요청안

### 3-1. 권장 계정 방식
Vercel은 개인 계정에 회사 카드나 결제를 연결하는 방식보다, 회사 또는 팀 소유의 Vercel Team을 생성하거나 기존 Team에 초대받아 사용하는 방식이 적절하다. Vercel은 Team 단위로 Billing과 사용량이 관리되므로, 소유권과 결제 책임을 분리하려면 처음부터 팀 계정 기준으로 운영하는 것이 안전하다. [cite:131][cite:132]

### 3-2. 권장 결제 방식
Vercel은 AWS처럼 초기 금액을 미리 넣어두는 방식보다, Team Billing에 회사 측 결제수단을 등록하고 자동 청구되도록 설정하는 방식이 일반적이다. 추가로 Spend Management를 켜서 지출 한도와 알림을 설정하면 예기치 않은 비용 증가를 통제하기 쉽다. [cite:130][cite:131]

### 3-3. 결제팀 요청 사항
- 회사 또는 팀 소유 Vercel Team 생성 또는 기존 Team 초대 요청
- 회사 측 Billing 관리자 또는 Owner 권한에서 결제수단 등록 요청
- Pro 플랜 기준 운영 검토 요청
- Spend Management 활성화 및 예산 경고 설정 요청
- 실무 팀은 프로젝트 운영 권한만 받고, Billing 수정 권한은 회사 측이 보유하는 구조 요청 [cite:130][cite:131][cite:132]

---

## 4. 결론
AWS는 회사 소유 계정 또는 회사 Organizations 멤버 계정을 제공받고, 초기에는 100달러 Advance Pay 선결제 검토안으로 운영하는 것이 적절하다. Vercel은 회사 또는 팀 소유 Team 계정에 회사 결제수단을 등록하고, 실무 팀은 해당 Team 아래에서 프로젝트를 운영하는 방식이 가장 적절하다. [cite:169][cite:175][cite:131]

---

## 참고 링크
- [Consolidating billing for AWS Organizations](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html) [cite:169]
- [Consolidated billing process](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html) [cite:170]
- [Using Advance Pay - AWS Billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-advancepay.html) [cite:175]
- [AWS Billing](https://aws.amazon.com/aws-cost-management/aws-billing/) [cite:52]
- [Billing FAQ for Pro Plan - Vercel](https://vercel.com/docs/plans/pro-plan/billing) [cite:130]
- [Spend Management - Vercel](https://vercel.com/docs/spend-management) [cite:131]
- [Pricing on Vercel](https://vercel.com/docs/pricing) [cite:132]
