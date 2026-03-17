require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemon.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/auth', require('./routes/auth.routes'));
app.use('/favorites', require('./routes/favorite.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/pokemon', pokemonRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', message: `Ruta ${req.path} no encontrada` });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 Pokédex API running at http://localhost:${PORT}`);
});
