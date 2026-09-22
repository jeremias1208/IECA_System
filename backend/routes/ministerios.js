const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/ministerios
router.get('/', (req, res) => {
  try {
    const ministerios = db.prepare('SELECT * FROM ministerios ORDER BY name').all();
    const getAtividades = db.prepare('SELECT activity FROM ministerio_atividades WHERE ministerio_id = ?');

    const result = ministerios.map(m => ({
      ...m,
      activities: getAtividades.all(m.id).map(a => a.activity)
    }));

    res.json({ success: true, data: result, total: result.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/ministerios/:id
router.get('/:id', (req, res) => {
  try {
    const ministerio = db.prepare('SELECT * FROM ministerios WHERE id = ?').get(req.params.id);
    if (!ministerio) return res.status(404).json({ success: false, error: 'Ministério não encontrado' });

    const activities = db.prepare('SELECT activity FROM ministerio_atividades WHERE ministerio_id = ?')
      .all(ministerio.id).map(a => a.activity);

    res.json({ success: true, data: { ...ministerio, activities } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ministerios
router.post('/', (req, res) => {
  try {
    const { id, name, code, description, audience, leader_name, leader_role, icon_name, image, activities = [] } = req.body;
    const newId = id || `min-${Date.now()}`;
    db.prepare(`
      INSERT INTO ministerios (id, name, code, description, audience, leader_name, leader_role, icon_name, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, name, code, description, audience, leader_name, leader_role, icon_name, image);

    for (const a of activities) {
      db.prepare('INSERT INTO ministerio_atividades (ministerio_id, activity) VALUES (?, ?)').run(newId, a);
    }

    res.status(201).json({ success: true, id: newId, message: 'Ministério criado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/ministerios/:id
router.put('/:id', (req, res) => {
  try {
    const { name, code, description, audience, leader_name, leader_role, icon_name, image, activities } = req.body;
    db.prepare(`
      UPDATE ministerios SET name=?, code=?, description=?, audience=?, leader_name=?, leader_role=?, icon_name=?, image=?, updated_at=datetime('now')
      WHERE id=?
    `).run(name, code, description, audience, leader_name, leader_role, icon_name, image, req.params.id);

    if (activities) {
      db.prepare('DELETE FROM ministerio_atividades WHERE ministerio_id = ?').run(req.params.id);
      for (const a of activities) {
        db.prepare('INSERT INTO ministerio_atividades (ministerio_id, activity) VALUES (?, ?)').run(req.params.id, a);
      }
    }

    res.json({ success: true, message: 'Ministério actualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/ministerios/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM ministerios WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Ministério eliminado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
