import express from 'express';
import { createReference, getAllReferences , deleteReference} from '../Controller/referenceController.js';

let router = express.Router();

router.post('/', createReference);
router.get('/', getAllReferences);
router.delete('/:id', deleteReference);

export default router;
