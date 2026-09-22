const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/lideranca
router.get('/', (req, res) => {
  try {
    const lideranca = db.prepare('SELECT * FROM lideranca ORDER BY sort_order ASC').all();
    res.json({ success: true, data: lideranca, total: lideranca.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/lideranca/:id
router.get('/:id', (req, res) => {
  try {
    const lider = db.prepare('SELECT * FROM lideranca WHERE id = ?').get(req.params.id);
    if (!lider) return res.status(404).json({ success: false, error: 'Membro de liderança não encontrado' });
    res.json({ success: true, data: lider });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/lideranca
router.post('/', (req, res) => {
  try {
    const { id, name, title, role, bio, photo, quote, sort_order = 0 } = req.body;
    const newId = id || `lead-${Date.now()}`;
    db.prepare(`
      INSERT INTO lideranca (id, name, title, role, bio, photo, quote, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, name, title, role, bio, photo, quote, sort_order);
    res.status(201).json({ success: true, id: newId, message: 'Membro de liderança criado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/lideranca/:id
router.put('/:id', (req, res) => {
  try {
    const { name, title, role, bio, photo, quote, sort_order } = req.body;
    db.prepare(`
      UPDATE lideranca SET name=?, title=?, role=?, bio=?, photo=?, quote=?, sort_order=?, updated_at=datetime('now')
      WHERE id=?
    `).run(name, title, role, bio, photo, quote, sort_order, req.params.id);
    res.json({ success: true, message: 'Liderança actualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/lideranca/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM lideranca WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Membro eliminado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
