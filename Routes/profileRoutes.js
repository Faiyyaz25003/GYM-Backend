
// import express from 'express';
// import {
//   createProfile,
//   getProfiles,
//   getMyProfile,
//   updateProfile,
//   deleteProfile,
// } from '../Controller/profileController.js';
// import authMiddleware from '../Middleware/authMiddleware.js';

// const router = express.Router();

// router.use(authMiddleware); // protect all profile routes

// router.post('/', createProfile);
// router.get('/', getProfiles);         // admin gets all, user gets self
// router.get('/me', getMyProfile);      // optional for easier frontend
// router.put('/:id', updateProfile);
// router.delete('/:id', deleteProfile);

// export default router;


import express from 'express';
import {
  createProfile,
  getMyProfile,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} from '../Controller/profileController.js';
import authenticate from '../Middleware/authMiddleware.js';

const router = express.Router();

// Only current user's profile
router.get('/me', authenticate, getMyProfile);

// Admin-only all profiles (e.g., for admin dashboard)
router.get('/', authenticate, getAllProfiles);

// Create profile (any logged-in user)
router.post('/', authenticate, createProfile);

// Update/Delete (admin can update/delete any; users only their own)
router.put('/:id', authenticate, updateProfile);
router.delete('/:id', authenticate, deleteProfile);

export default router;
