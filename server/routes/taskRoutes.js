import express from "express";
import { createTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getOrganisationTasks } from "../controllers/taskController.js";
const router = express.Router();

router.post("/", protect, createTask);
router.get("/:organisationId",protect,getOrganisationTasks);

export default router;
