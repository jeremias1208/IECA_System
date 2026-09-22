/**
 * IECA System — Express REST API Server
 * Porta: 3001
 * Base de Dados: SQLite (backend/db/ieca.db)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize database (creates tables + seed if needed)
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─────────────────────────────────────────────
// Request Logger
// ─────────────────────────────────────────────
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().slice(11, 19);
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
app.use('/api/congregacoes', require('./routes/congregacoes'));
app.use('/api/noticias', require('./routes/noticias'));
app.use('/api/eventos', require('./routes/eventos'));
app.use('/api/ministerios', require('./routes/ministerios'));
app.use('/api/lideranca', require('./routes/lideranca'));
app.use('/api/recursos', require('./routes/recursos'));
app.use('/api/projetos', require('./routes/projetos'));
app.use('/api/hinario', require('./routes/hinario'));
app.use('/api/users', require('./routes/users'));

// ─────────────────────────────────────────────
// Health Check & API Info
// ─────────────────────────────────────────────
app.get('/api', (req, res) => {
  const tables = [
    'congregacoes', 'noticias', 'eventos', 'ministerios',
    'lideranca', 'recursos_documentos', 'projetos_sociais',
    'hinos', 'litanias', 'oracoes', 'invocatorias', 'salmos', 'usuarios'
  ];

  const stats = {};
  for (const t of tables) {
    try {
      stats[t] = db.prepare(`SELECT COUNT(*) as c FROM ${t}`).get().c;
    } catch {
      stats[t] = 0;
    }
  }

  res.json({
    name: 'IECA Digital System API',
    version: '1.0.0',
    status: 'online',
    timestamp: new Date().toISOString(),
    database: 'SQLite (ieca.db)',
    endpoints: [
      'GET  /api/congregacoes',
      'GET  /api/noticias',
      'GET  /api/eventos',
      'GET  /api/ministerios',
      'GET  /api/lideranca',
      'GET  /api/recursos',
      'GET  /api/projetos',
      'GET  /api/hinario',
      'GET  /api/hinario/:route (hinos|litanias|oracoes|invocatorias|salmos)',
      'POST /api/hinario/sync',
      'POST /api/users/login',
    ],
    stats
  });
});

// ─────────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Rota não encontrada: ${req.method} ${req.path}`,
    hint: 'Consulte GET /api para ver todos os endpoints disponíveis'
  });
});

// ─────────────────────────────────────────────
// Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err.message);
  res.status(500).json({ success: false, error: 'Erro interno do servidor' });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🏛️  IECA Digital System — API Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  🌐 URL:      http://localhost:${PORT}`);
  console.log(`  📋 Endpoints: http://localhost:${PORT}/api`);
  console.log(`  🗄️  Database: SQLite (backend/db/ieca.db)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('  Dica: Para sincronizar o hinário, visite:');
  console.log(`  POST http://localhost:${PORT}/api/hinario/sync\n`);
});
