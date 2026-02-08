
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import connectDB from './config/database.js';

// // Route Imports
// import authRoutes from './routes/authRoutes.js';
// import planRoutes from './routes/planRoutes.js';
// import scheduleRoutes from './routes/scheduleRoutes.js';
// import traineeRoutes from './routes/traineeRoutes.js';
// import memberRoutes from './routes/memberRoutes.js';
// import contactRoutes from './routes/contactRoutes.js';
// import profileRoutes from './routes/profileRoutes.js';
// import achievementRoutes from './Routes/acheivementRoutes.js'; // ✅ fixed spelling
// import notificationRoutes from './Routes/notificationRoutes.js';
// import referenceRoutes from './Routes/referenceRoutes.js';
// import dietRoutes from './Routes/dietRoutes.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '5mb' }));

// // Serve static image files
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); // ✅ important for serving uploaded images

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/plans', planRoutes);
// app.use('/api/schedules', scheduleRoutes);
// app.use('/api/trainees', traineeRoutes);
// app.use('/api/members', memberRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/profiles', profileRoutes);
// app.use('/api/achievements', achievementRoutes); // ✅ ensure route file is named correctly
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/references', referenceRoutes);
// app.use('/api/diets', dietRoutes);

// // Health Check
// app.get('/api/health', (req, res) => {
//   res.json({
//     message: '🏋️‍♂️ Gym Management API is running 🚀',
//     timestamp: new Date().toISOString(),
//   });
// });

// // 404 Fallback
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found ❌' });
// });

// // Error Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
//   console.log(`🚀 API ready at /api`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/database.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import dietRoutes from './Routes/dietRoutes.js'
import planRoutes from './routes/planRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import traineeRoutes from './routes/traineeRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import achievementRoutes from './routes/acheivementRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import referenceRoutes from './routes/referenceRoutes.js';
import excersizeReferenceRoutes from './Routes/excersizeReferenceRoutes.js';
import attendanceRoutes from "./Routes/attendanceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/trainees', traineeRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/references', referenceRoutes);
app.use('/api/excersizeReference', excersizeReferenceRoutes);
app.use("/api/attendance", attendanceRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    message: '🏋️‍♂️ Gym Management API is running 🚀',
    timestamp: new Date().toISOString(),
  });
});

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// 404 Fallback
app.use('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found ❌` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`🚀 API Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/diets`);
  console.log(`   POST /api/diets`);
  console.log(`   GET  /api/auth/users`);
});
