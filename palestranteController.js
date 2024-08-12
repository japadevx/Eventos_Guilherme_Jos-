import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

// Controlador para criar um novo palestrante
export const createPalestrante = (req, res) => {
    const { nome, expertise } = req.body;

    if (!nome || !expertise) {
        return res.status(400).json({ msg: "Por favor, preencha todos os campos obrigatórios." });
    }

    const id = uuidv4();  // GERADOR DE ID

    const sql = "INSERT INTO palestrantes (palestrante_id, nome, expertise) VALUES (?, ?, ?)";

    conn.query(sql, [id, nome, expertise], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao criar o palestrante." });
        }
        res.status(201).json({ msg: "Palestrante criado com sucesso!", id });
    });
};

export const getPalestrantes = (req, res) => {
    const sql = "SELECT * FROM palestrantes";

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao buscar os palestrantes." });
        }
        res.status(200).json(results);
    });
};
