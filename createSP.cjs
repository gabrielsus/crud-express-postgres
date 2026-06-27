require("dotenv").config();
const  { Pool } = require("pg");
const pool = new Pool({connectionString: process.env.DATABASE_URL});

const crearProcedimiento = async () => {
const query = `
    CREATE OR REPLACE PROCEDURE insertar_tarea(titulo_tarea VARCHAR)
    LANGUAGE plpgsql
    AS $$
    BEGIN
      INSERT INTO tareas (titulo) VALUES (titulo_tarea);
    END;
    $$;
`;
try {
    await pool.query(query);
    console.log("Procedimiento almacenado creado exitosamente.");
} catch (error) {
    console.error("Error al crear el procedimiento almacenado:", error);
}
};
crearProcedimiento();
