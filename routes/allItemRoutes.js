import express from 'express';
import { getAllItems } from '../controllers/allItemController.js';

const router = express.Router();

router.get('/', getAllItems);

export default router;
