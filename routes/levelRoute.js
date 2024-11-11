import express from 'express';
import { getlevelData } from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getlevelData);

export default router;
