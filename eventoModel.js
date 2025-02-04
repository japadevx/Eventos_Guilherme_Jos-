import conn from "../config/conn.js";

const tableEventos = `
    CREATE TABLE IF NOT EXISTS eventos (
        evento_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        data DATE NOT NULL,
        palestrante_id VARCHAR(60),
        participante_id VARCHAR(60),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (palestrante_id) REFERENCES palestrantes(palestrante_id),
        FOREIGN KEY (participante_id) REFERENCES participantes(participante_id)
    )
`;

conn.query(tableEventos, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Tabela de [eventos] criada com sucesso");
});

export default tableEventos;
