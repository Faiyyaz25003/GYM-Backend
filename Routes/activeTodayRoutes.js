import express from 'express';
import { getActiveToday } from '../Controller/activeTodayController.js';

const router = express.Router();

router.get('/', getActiveToday);

export default router;
