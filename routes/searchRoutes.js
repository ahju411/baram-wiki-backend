import express from 'express';
import { getPopularItems } from '../controllers/itemController.js';

const router = express.Router();

// 실시간 인기 아이템 순위 엔드포인트
router.get('/popular-items', getPopularItems);

export default router;
