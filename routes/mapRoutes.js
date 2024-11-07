import express from 'express';
import { getMapById } from '../controllers/mapController.js';

const router = express.Router();

router.get('/:id', getMapById);

export default router;

