import express from 'express';
import {
	getlevelData,
	calculateExpRequired,
} from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getlevelData);
router.get('/calculate', calculateExpRequired);

export default router;
