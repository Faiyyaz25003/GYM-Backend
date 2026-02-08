import express from "express";
import {
    punchIn,
    punchOut,
    getAttendance,
    getTodayStatus,
} from "../Controller/attendanceController.js";

const router = express.Router();

router.post("/punch-in", punchIn);
router.post("/punch-out", punchOut);
router.get("/", getAttendance);
router.get("/today/:userId", getTodayStatus);

export default router;
