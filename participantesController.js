import conn from "../config/conn.js";

export const registrarParticipante = (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ msg: "Por favor, preencha todos os campos obrigatórios." });
    }

    const sql = "INSERT INTO participantes (nome, email) VALUES (?, ?)";

    conn.query(sql, [nome, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao registrar o participante." });
        }
        res.status(201).json({ msg: "Participante registrado com sucesso!" });
    });
};

export const inscreverParticipante = (req, res) => {
    const { participanteId, eventoId } = req.body;

    if (!participanteId || !eventoId) {
        return res.status(400).json({ msg: "Por favor, forneça o ID do participante e do evento." });
    }

    const sql = `INSERT INTO participantes_eventos (participante_id, evento_id) VALUES (?, ?)`;

    conn.query(sql, [participanteId, eventoId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao inscrever o participante no evento." });
        }
        res.status(201).json({ msg: "Participante inscrito no evento com sucesso!" });
    });
};
