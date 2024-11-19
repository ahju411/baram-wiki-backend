import express from 'express';
import { searchAll } from '../controllers/searchController.js';
import { getPopularItems } from '../controllers/itemController.js';

const router = express.Router();

router.get('/popular-items', getPopularItems);
router.get('/', searchAll);

export default router;
