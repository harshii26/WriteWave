import express from "express";
import {
	generateUserReport,
	// generatePostReport,
	// generateNotificationReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/generate-users", generateUserReport);
// router.get("/generate-posts", generatePostReport);
// router.get("/generate-notifications", generateNotificationReport);

export default router;