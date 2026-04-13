import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controllers/aiController.js";
import ai from "../configs/ai.js";
import { updateResume } from "../controllers/resumeController.js";



const aiRouter = express.Router();

// Define your AI-related routes here

aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary);

aiRouter.post('/enhance-job-desc',protect,enhanceJobDescription);

aiRouter.post('/upload-resume',protect,updateResume);

export default aiRouter;