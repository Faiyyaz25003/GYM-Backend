
import express from 'express';
import {
    getTrainees,
    getTrainee,
    createTrainee,
    updateTrainee,
    deleteTrainee,
    getTraineeCount, // 👈 Include the new controller
} from '../Controller/traineeController.js';

const router = express.Router();

router.get('/', getTrainees);
router.get('/count', getTraineeCount); // 👈 NEW ROUTE for dashboard count
router.get('/:id', getTrainee);
router.post('/', createTrainee);
router.put('/:id', updateTrainee);
router.delete('/:id', deleteTrainee);

export default router;
