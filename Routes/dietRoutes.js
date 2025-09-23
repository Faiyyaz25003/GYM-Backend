import express from 'express';
import {
  getAllDiet,
  createDiet,
  getDietById,
  updateDiet,
  deleteDiet,
} from '../Controller/dietController.js';

const router = express.Router();

// GET all diets
router.get('/', getAllDiet);

// POST create new diet
router.post('/', createDiet);

// GET single diet by ID
router.get('/:id', getDietById);

// PUT update diet by ID
router.put('/:id', updateDiet);

// DELETE diet by ID
router.delete('/:id', deleteDiet);

export default router;
