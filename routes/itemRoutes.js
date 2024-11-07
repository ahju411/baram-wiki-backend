// routes/itemRoutes.js
import express from 'express';
import { getItemById } from '../controllers/itemController.js';

const router = express.Router();

// 아이템 상세 정보 조회 라우트
router.get('/:id', getItemById);

export default router;
