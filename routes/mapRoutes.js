import express from 'express';
import {
	getMapById,
	getMapsGroupByLevel,
} from '../controllers/mapController.js';

const router = express.Router();

router.get('/level-guide', getMapsGroupByLevel);
router.get('/:id', getMapById);

export default router;
