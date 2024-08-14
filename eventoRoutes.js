import express from "express";
import { createEvento, getAgenda } from "../controllers/eventosController.js";
import { registrarParticipante, inscreverParticipante } from "../controllers/participantesController.js";

const router = express.Router();

// Rotas dos Eventos
router.post("/criar", createEvento);
router.get("/agenda", getAgenda);

// Rotas dos Participantes
router.post("/participantes/registrar", registrarParticipante);
router.post("/inscrever", inscreverParticipante);

export default router;
