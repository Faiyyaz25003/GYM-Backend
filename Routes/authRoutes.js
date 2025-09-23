import express from 'express';
import {
  register,
  login,
  getAllUsers,
  deleteUser,
  getActiveUsers,
  updateActiveStatus
} from '../Controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/active-users', getActiveUsers);
router.post('/active', updateActiveStatus); // 👈 this is the important one

export default router;



// import express from 'express';
// import {
//   register,
//   login,
//   getAllUsers,
//   deleteUser,
//   getActiveUsers,
//   updateActiveStatus
// } from '../Controller/authController.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/users', getAllUsers);
// router.delete('/users/:id', deleteUser);
// router.get('/active-users', getActiveUsers);
// router.post('/active', updateActiveStatus);

// export default router;
