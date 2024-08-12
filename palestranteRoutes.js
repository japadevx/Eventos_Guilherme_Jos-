import express from "express";
import { createPalestrante, getPalestrantes } from "../controllers/palestranteController.js";

const router = express.Router();

// Rotas dos Palestrante
router.post("/palestrantes", createPalestrante);
router.get("/palestrantes", getPalestrantes);

export default router;
