

import express from 'express';
import {
    createPlan,
    getPlans,
    getPlanCount,
    updatePlan,
    deletePlan,
} from "../Controller/planController.js";

const router = express.Router();

router.post('/', createPlan);
router.get('/', getPlans);
router.get('/count', getPlanCount); // Dashboard count route
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
