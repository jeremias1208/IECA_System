const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/noticias
router.get('/', (req, res) => {
  try {
    const { category, search, limit = 50, offset = 0 } = req.query;
    let query = 'SELECT * FROM noticias WHERE published = 1';
    const params = [];

    if (category) { query += ' AND category = ?'; params.push(category); }
    if (search) { query += ' AND (title LIKE ? OR summary LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

    query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const noticias = db.prepare(query).all(...params);
    const total = db.prepare('SELECT COUNT(*) as c FROM noticias WHERE published = 1').get().c;

    res.json({ success: true, data: noticias, total });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/noticias/:id
router.get('/:id', (req, res) => {
  try {
    const noticia = db.prepare('SELECT * FROM noticias WHERE id = ?').get(req.params.id);
    if (!noticia) return res.status(404).json({ success: false, error: 'Notícia não encontrada' });
    res.json({ success: true, data: noticia });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/noticias
router.post('/', (req, res) => {
  try {
    const { id, title, summary, content, category, date, author, image, read_time, published = 1 } = req.body;
    const newId = id || `news-${Date.now()}`;
    db.prepare(`
      INSERT INTO noticias (id, title, summary, content, category, date, author, image, read_time, published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, title, summary, content, category, date, author, image, read_time, published);
    res.status(201).json({ success: true, id: newId, message: 'Notícia criada com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/noticias/:id
router.put('/:id', (req, res) => {
  try {
    const { title, summary, content, category, date, author, image, read_time, published } = req.body;
    db.prepare(`
      UPDATE noticias SET title=?, summary=?, content=?, category=?, date=?, author=?, image=?, read_time=?, published=?, updated_at=datetime('now')
      WHERE id=?
    `).run(title, summary, content, category, date, author, image, read_time, published, req.params.id);
    res.json({ success: true, message: 'Notícia actualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/noticias/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM noticias WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Notícia eliminada com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
