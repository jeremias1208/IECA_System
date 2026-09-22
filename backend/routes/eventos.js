const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/eventos
router.get('/', (req, res) => {
  try {
    const { category, synod, is_national, upcoming } = req.query;
    let query = 'SELECT * FROM eventos WHERE 1=1';
    const params = [];

    if (category) { query += ' AND category = ?'; params.push(category); }
    if (synod) { query += ' AND synod LIKE ?'; params.push(`%${synod}%`); }
    if (is_national !== undefined) { query += ' AND is_national = ?'; params.push(Number(is_national)); }
    if (upcoming === 'true') { query += ' AND date >= date(\'now\')'; }

    query += ' ORDER BY date ASC';
    const eventos = db.prepare(query).all(...params);
    res.json({ success: true, data: eventos, total: eventos.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/eventos/:id
router.get('/:id', (req, res) => {
  try {
    const evento = db.prepare('SELECT * FROM eventos WHERE id = ?').get(req.params.id);
    if (!evento) return res.status(404).json({ success: false, error: 'Evento não encontrado' });
    res.json({ success: true, data: evento });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/eventos
router.post('/', (req, res) => {
  try {
    const { id, title, date, time, location, synod, category, description, is_national = 0 } = req.body;
    const newId = id || `evt-${Date.now()}`;
    db.prepare(`
      INSERT INTO eventos (id, title, date, time, location, synod, category, description, is_national)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, title, date, time, location, synod, category, description, is_national);
    res.status(201).json({ success: true, id: newId, message: 'Evento criado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/eventos/:id
router.put('/:id', (req, res) => {
  try {
    const { title, date, time, location, synod, category, description, is_national } = req.body;
    db.prepare(`
      UPDATE eventos SET title=?, date=?, time=?, location=?, synod=?, category=?, description=?, is_national=?, updated_at=datetime('now')
      WHERE id=?
    `).run(title, date, time, location, synod, category, description, is_national, req.params.id);
    res.json({ success: true, message: 'Evento actualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/eventos/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM eventos WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Evento eliminado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
