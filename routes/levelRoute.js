import express from 'express';
import {
    getlevelData,
    getKingLevelData,
	calculateExpRequired
} from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getlevelData);
router.get('/king', getKingLevelData);
router.get('/calculate', calculateExpRequired);

export default router;
