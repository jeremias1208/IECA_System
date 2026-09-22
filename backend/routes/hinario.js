const express = require('express');
const router = express.Router();
const db = require('../database');
const { syncAllHinario, syncRoute } = require('../sync-hinario');

// Tabelas válidas do hinário
const VALID_ROUTES = ['hinos', 'litanias', 'oracoes', 'invocatorias', 'salmos'];

// GET /api/hinario — listar todas as categorias disponíveis com contagem
router.get('/', (req, res) => {
  try {
    const summary = VALID_ROUTES.map(route => {
      const count = db.prepare(`SELECT COUNT(*) as c FROM ${route}`).get().c;
      const lastSync = db.prepare(`SELECT synced_at FROM ${route} ORDER BY synced_at DESC LIMIT 1`).get();
      return {
        route,
        total: count,
        last_synced: lastSync?.synced_at || null
      };
    });
    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/hinario/:route — listar itens de uma categoria
router.get('/:route', (req, res) => {
  try {
    const { route } = req.params;
    if (!VALID_ROUTES.includes(route)) {
      return res.status(400).json({ success: false, error: `Rota inválida. Use: ${VALID_ROUTES.join(', ')}` });
    }

    const { search, idioma, limit = 100, offset = 0 } = req.query;
    let query = `SELECT * FROM ${route} WHERE 1=1`;
    const params = [];

    if (search) {
      const contentColumn = route === 'hinos' ? 'letra' : 'descricao';
      query += ` AND (CAST(numero AS TEXT) LIKE ? OR ${contentColumn} LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }
    if (idioma) { query += ' AND idioma_nome LIKE ?'; params.push(`%${idioma}%`); }

    query += ' ORDER BY numero ASC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const items = db.prepare(query).all(...params);
    const total = db.prepare(`SELECT COUNT(*) as c FROM ${route}`).get().c;
    const lastSync = db.prepare(`SELECT synced_at FROM ${route} ORDER BY synced_at DESC LIMIT 1`).get();

    res.json({
      success: true,
      route,
      data: items.map(item => ({
        id: item.id,
        numero: item.numero,
        ...(route === 'hinos' ? { letra: item.letra } : { descricao: item.descricao }),
        Idioma: { id: item.idioma_id, nome: item.idioma_nome }
      })),
      total,
      last_synced: lastSync?.synced_at || null
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/hinario/:route/:id — item individual
router.get('/:route/:id', (req, res) => {
  try {
    const { route, id } = req.params;
    if (!VALID_ROUTES.includes(route)) {
      return res.status(400).json({ success: false, error: 'Rota inválida' });
    }

    const item = db.prepare(`SELECT * FROM ${route} WHERE id = ?`).get(id);
    if (!item) return res.status(404).json({ success: false, error: 'Item não encontrado' });

    res.json({
      success: true,
      data: {
        id: item.id,
        numero: item.numero,
        ...(route === 'hinos' ? { letra: item.letra } : { descricao: item.descricao }),
        Idioma: { id: item.idioma_id, nome: item.idioma_nome }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/hinario/sync — sincronizar todas as categorias
router.post('/sync', async (req, res) => {
  try {
    const results = await syncAllHinario();
    res.json({ success: true, message: 'Sincronização concluída', results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/hinario/sync/:route — sincronizar uma categoria específica
router.post('/sync/:route', async (req, res) => {
  try {
    const { route } = req.params;
    if (!VALID_ROUTES.includes(route)) {
      return res.status(400).json({ success: false, error: 'Rota inválida' });
    }
    const result = await syncRoute(route);
    res.json({ success: true, message: `Sincronização de /${route} concluída`, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/hinario/sync/log — ver histórico de sincronizações
router.get('/sync/log', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM sync_log ORDER BY synced_at DESC LIMIT 50').all();
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
