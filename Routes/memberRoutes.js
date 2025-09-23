
import express from 'express';
import {
  createMember,
  getMembers,
  getRecentMembers,
  updateMember,
  deleteMember,
} from "../Controller/memberController.js";


const router = express.Router();

router.post('/', createMember);
router.get('/', getMembers);
router.get('/recent', getRecentMembers); // 👈 For last 3 days
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
