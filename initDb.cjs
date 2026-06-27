require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const crearTabla = async () => {
    try {
        const query = `
      CREATE TABLE IF NOT EXISTS tareas (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        completada BOOLEAN DEFAULT FALSE,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await pool.query(query);
        console.log("Tabla 'tareas' creada o ya existente.");
    } catch (err) {
        console.error("Error al crear la tabla:", err.stack);
    }
    finally {
        await pool.end();
    }
};
crearTabla();