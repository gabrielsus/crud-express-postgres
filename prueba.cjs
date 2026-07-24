const express = require('express');
const cors = require('cors');
const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

const app = express();
const sql = neon(process.env.DATABASE_URL);

// Middleware básico
app.use(cors());
app.use(express.json());

// La ruta que esperabas
app.get('/api/version', async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    res.json({ version: result[0].version });
  } catch (error) {
    res.status(500).json({ error: "Error de conexión" });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});