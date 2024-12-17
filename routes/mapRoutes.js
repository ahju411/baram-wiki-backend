import express from 'express';
import {
	getMapById,
	getMapsGroupByLevel,
	getAllMainMaps,
	getMainMapDetail,
	findPath,
	searchMaps,
} from '../controllers/mapController.js';

const router = express.Router();

router.get('/level-guide', getMapsGroupByLevel);
router.get('/all', getAllMainMaps);
router.get('/path', findPath);
router.get('/search', searchMaps);
router.get('/all/:id', getMainMapDetail);
router.get('/:id', getMapById);

export default router;
