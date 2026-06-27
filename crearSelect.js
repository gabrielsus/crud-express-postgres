require("dotenv").config();
const  { Pool } = require("pg");
const pool = new Pool({connectionString: process.env.DATABASE_URL});

const crearProcedimiento = async () => {
const query = `
    CREATE OR REPLACE FUNCNTION listar_tarea()
    returns TABLE (id SERIAL, titulo VARCHAR)
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY SELECT * FROM tareas;
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
