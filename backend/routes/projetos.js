const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/projetos
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM projetos_sociais WHERE 1=1';
    const params = [];

    if (category) { query += ' AND category = ?'; params.push(category); }
    query += ' ORDER BY title';

    const projetos = db.prepare(query).all(...params);
    res.json({ success: true, data: projetos, total: projetos.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/projetos/:id
router.get('/:id', (req, res) => {
  try {
    const projeto = db.prepare('SELECT * FROM projetos_sociais WHERE id = ?').get(req.params.id);
    if (!projeto) return res.status(404).json({ success: false, error: 'Projecto não encontrado' });
    res.json({ success: true, data: projeto });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/projetos
router.post('/', (req, res) => {
  try {
    const { id, title, category, location, beneficiaries, description, stats, image } = req.body;
    const newId = id || `soc-${Date.now()}`;
    db.prepare(`
      INSERT INTO projetos_sociais (id, title, category, location, beneficiaries, description, stats, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, title, category, location, beneficiaries, description, stats, image);
    res.status(201).json({ success: true, id: newId, message: 'Projecto criado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/projetos/:id
router.put('/:id', (req, res) => {
  try {
    const { title, category, location, beneficiaries, description, stats, image } = req.body;
    db.prepare(`
      UPDATE projetos_sociais SET title=?, category=?, location=?, beneficiaries=?, description=?, stats=?, image=?, updated_at=datetime('now')
      WHERE id=?
    `).run(title, category, location, beneficiaries, description, stats, image, req.params.id);
    res.json({ success: true, message: 'Projecto actualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/projetos/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM projetos_sociais WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Projecto eliminado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
