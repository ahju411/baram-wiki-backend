## 바람의나라 위키 백엔드 서버

_바람의나라 게임 정보를 제공하는 위키 서비스_

<br/>

## 🪄 소개

> 바람의나라의 아이템, 몬스터, 맵, 스킬 정보를 손쉽게 찾아보세요! <br/>
> 상세한 정보와 함께 게임 플레이에 도움이 되는 정보를 제공합니다.

<br/>

## 📱 주요 기능

- **아이템 정보**: 무기, 방어구 등 다양한 아이템의 상세 정보 제공
- **몬스터 정보**: 레벨, HP, MP, 드롭 아이템 등 몬스터 정보 제공
- **맵 정보**: 각 지역별 출현 몬스터, 레벨 범위 등 정보 제공
- **스킬 정보**: 직업별 스킬 정보와 필요 아이템 정보 제공

<br/>

## 🛠 Tech Stack

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"/>

<br/>

## 📂 프로젝트 구조

```
├── controllers/
│   ├── itemController.js
│   ├── mapController.js
│   ├── monsterController.js
│   └── skillController.js
├── models/
│   ├── ItemMaster.js
│   ├── MapMaster.js
│   ├── MobMaster.js
│   ├── SkillMaster.js
│   └── index.js
├── routes/
│   ├── itemRoutes.js
│   ├── mapRoutes.js
│   ├── monsterRoutes.js
│   └── skillRoutes.js
├── app.js
└── ecosystem.config.cjs
```

## 📌 API 엔드포인트

### 아이템
- `GET /api/item/:id` - 아이템 상세 정보 조회

### 몬스터
- `GET /api/monster/:id` - 몬스터 상세 정보 및 드롭 아이템 조회

### 맵
- `GET /api/map/:id` - 맵 정보 및 출현 몬스터 조회

### 스킬
- `GET /api/skill/job/:job` - 직업별 스킬 목록 조회

<br/>

## 🔧 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run start

# PM2로 서버 실행
npm run pm2:start

# 프로덕션 모드로 실행
npm run pm2:prod
```

<br/>

## 💾 데이터베이스 구조

- **ItemMaster**: 아이템 기본 정보
- **MobMaster**: 몬스터 기본 정보
- **MobDrop**: 몬스터 드롭 아이템 정보
- **MapMaster**: 맵 기본 정보
- **MapRespawn**: 맵별 몬스터 출현 정보
- **SkillMaster**: 스킬 기본 정보
- **SkillDetail**: 스킬 상세 정보
```
