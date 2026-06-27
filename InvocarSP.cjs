require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({connectionString: process.env.DATABASE_URL});

const insertar = async (valor) => {
    try {
        await pool.query("call insertar_tarea($1)", [valor]);
        console.log("Tarea insertada exitosamente.");
    } catch (error) {
        console.error("Error al insertar la tarea:", error);
    }
};
insertar("The Rime of the Ancient Mariner");