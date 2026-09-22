const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = new Set([
  'image/jpeg', 'image/png', 'image/webp',
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (allowedMimeTypes.has(file.mimetype)) return callback(null, true);
    callback(new Error('Tipo de arquivo não permitido. Use imagem, PDF ou Word.'));
  }
});

// GET /api/recursos
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM recursos_documentos WHERE 1=1';
    const params = [];

    if (category) { query += ' AND category = ?'; params.push(category); }
    query += ' ORDER BY date DESC';

    const recursos = db.prepare(query).all(...params);
    res.json({ success: true, data: recursos, total: recursos.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/recursos/:id
router.get('/:id', (req, res) => {
  try {
    const recurso = db.prepare('SELECT * FROM recursos_documentos WHERE id = ?').get(req.params.id);
    if (!recurso) return res.status(404).json({ success: false, error: 'Documento não encontrado' });
    res.json({ success: true, data: recurso });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/recursos/upload — upload de ficheiro e registo no centro de documentação
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'Selecione um arquivo.' });

    const title = String(req.body.title || req.file.originalname).trim();
    const category = String(req.body.category || 'Documentos');
    const extension = path.extname(req.file.originalname).replace('.', '').toUpperCase();
    const resourceId = `res-${Date.now()}`;
    const fileUrl = `/uploads/${req.file.filename}`;

    db.prepare(`
      INSERT INTO recursos_documentos (id, title, category, format, size, date, file_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(resourceId, title, category, extension, `${(req.file.size / 1024 / 1024).toFixed(2)} MB`, new Date().toISOString().slice(0, 10), fileUrl);

    const resource = db.prepare('SELECT * FROM recursos_documentos WHERE id = ?').get(resourceId);
    res.status(201).json({ success: true, data: resource, message: 'Arquivo enviado com sucesso.' });
  } catch (err) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/recursos/:id/download — increment download count
router.post('/:id/download', (req, res) => {
  try {
    db.prepare('UPDATE recursos_documentos SET download_count = download_count + 1 WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Download registado' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/recursos
router.post('/', (req, res) => {
  try {
    const { id, title, category, format = 'PDF', size, date, file_url } = req.body;
    const newId = id || `res-${Date.now()}`;
    db.prepare(`
      INSERT INTO recursos_documentos (id, title, category, format, size, date, file_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(newId, title, category, format, size, date, file_url);
    res.status(201).json({ success: true, id: newId, message: 'Documento criado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/recursos/:id
router.put('/:id', (req, res) => {
  try {
    const { title, category, format, size, date, file_url } = req.body;
    db.prepare(`
      UPDATE recursos_documentos SET title=?, category=?, format=?, size=?, date=?, file_url=?, updated_at=datetime('now')
      WHERE id=?
    `).run(title, category, format, size, date, file_url, req.params.id);
    res.json({ success: true, message: 'Documento actualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/recursos/:id
router.delete('/:id', (req, res) => {
  try {
    const resource = db.prepare('SELECT file_url FROM recursos_documentos WHERE id = ?').get(req.params.id);
    db.prepare('DELETE FROM recursos_documentos WHERE id = ?').run(req.params.id);
    if (resource?.file_url?.startsWith('/uploads/')) {
      fs.unlink(path.join(uploadDirectory, path.basename(resource.file_url)), () => {});
    }
    res.json({ success: true, message: 'Documento eliminado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
