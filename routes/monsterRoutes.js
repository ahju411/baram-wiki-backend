// routes/monsterRoutes.js
import express from 'express';
import { getMonsterById } from '../controllers/monsterController.js';

const router = express.Router();

// 몬스터 상세 정보 조회 라우트
router.get('/:id', getMonsterById);

export default router;
