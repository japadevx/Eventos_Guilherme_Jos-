import conn from "../config/conn.js";

export const createEvento = (req, res) => {
    const { titulo, data, palestrantesId } = req.body;

    if (!titulo || !data || !palestrantesId) {
        return res.status(400).json({ msg: "Por favor, preencha todos os campos obrigatórios." });
    }

    const sqlEvento = "INSERT INTO eventos (titulo, data) VALUES (?, ?)";

    conn.query(sqlEvento, [titulo, data], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao criar o evento." });
        }

        const eventoId = results.insertId;

        const sqlPalestrantes = `
            INSERT INTO palestrantes_eventos (evento_id, palestrante_id) VALUES ?
        `;

        const values = palestrantesId.map(palestranteId => [eventoId, palestranteId]);

        conn.query(sqlPalestrantes, [values], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Erro ao associar palestrantes ao evento." });
            }
            res.status(201).json({ msg: "Evento criado com sucesso!" });
        });
    });
};

export const getAgenda = (req, res) => {
    const sql = `
        SELECT e.evento_id, e.titulo, e.data, p.palestrante_id, p.nome AS palestrante_nome, p.expertise
        FROM eventos e
        LEFT JOIN palestrantes_eventos pe ON e.evento_id = pe.evento_id
        LEFT JOIN palestrantes p ON pe.palestrante_id = p.palestrante_id
    `;

    conn.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Erro ao buscar a agenda dos eventos." });
        }

        const agenda = results.reduce((acc, row) => {
            const evento = acc.find(e => e.evento_id === row.evento_id);
            const palestrante = {
                palestrante_id: row.palestrante_id,
                nome: row.palestrante_nome,
                expertise: row.expertise
            };

            if (evento) {
                evento.palestrantes.push(palestrante);
            } else {
                acc.push({
                    evento_id: row.evento_id,
                    titulo: row.titulo,
                    data: row.data,
                    palestrantes: [palestrante]
                });
            }

            return acc;
        }, []);

        res.status(200).json(agenda);
    });
};
