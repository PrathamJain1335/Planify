import express from "express";
import { createOrganisation } from "../controllers/organisationController.js";
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/", protect,createOrganisation);

export default router;