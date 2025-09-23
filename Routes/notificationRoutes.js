import express from 'express';
import { getNotifications, deleteNotification, markNotificationAsRead } from '../Controller/notificationController.js';
const router = express.Router();

router.get('/', getNotifications);
router.delete('/:id', deleteNotification);
router.put('/:id/read', markNotificationAsRead);

export default router;
