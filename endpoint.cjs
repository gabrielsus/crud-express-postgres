require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware para parsear JSON en las peticiones POST
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const insertar = async (valor) => {
    try {
        await pool.query("call insertar_tarea($1)", [valor]);
        console.log(`Tarea insertada exitosamente: "${valor}"`);
        return true;
    } catch (error) {
        console.error("Error al insertar la tarea:", error);
        throw error;
    }
};

// Endpoint POST para recibir la tarea desde el cliente
app.post("/insertarTarea", async (req, res) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ error: "El campo 'valor' es requerido." });
    }

    try {
        await insertar(valor);
        res.status(201).json({ mensaje: "Tarea insertada exitosamente.", valor });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor al insertar la tarea." });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});