;


import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement
} from "../Controller/acheivementController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/achievements";
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createAchievement);
router.get("/", getAchievements);
router.get("/:id", getAchievementById);
router.put("/:id", upload.single("image"), updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;
