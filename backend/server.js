const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ ajout ici
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json());

// ✅ Activer CORS pour autoriser le frontend React (Vite sur port 5175)
app.use(cors({
  origin: 'http://localhost:5173', // autorise seulement Vite en local
  credentials: true
}));

// Routes
const competenceRoutes = require('./routes/competences');
app.use('/api/competences', competenceRoutes);

// Serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});
