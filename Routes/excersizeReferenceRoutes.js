import express from 'express';
import {
  createExcersizeReference,
  getAllExcersizeReferences,
  deleteExcersizeReference,
} from '../Controller/excersizeReferenceController.js';

const router = express.Router();

router.post('/', createExcersizeReference);
router.get('/', getAllExcersizeReferences);
router.delete('/:id', deleteExcersizeReference);

export default router;
