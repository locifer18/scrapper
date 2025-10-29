import express from "express";
import { generatemd } from "../controllers/generatemd.controller";

const router = express.Router();

router.post("/generate-md", generatemd);

export default router;
