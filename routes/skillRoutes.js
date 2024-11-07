import express from 'express';
import { getSkillsByJob } from '../controllers/skillController.js';

const router = express.Router();

router.get('/job/:job', getSkillsByJob);

export default router;