const express = require('express');
const router = express.Router();
const db = require('../database');

// GET /api/users
router.get('/', (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, active, last_login, created_at FROM usuarios ORDER BY name').all();
    res.json({ success: true, data: users, total: users.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, role, active, last_login, created_at FROM usuarios WHERE id = ?').get(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'Utilizador não encontrado' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users/login — autenticação simples
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email e palavra-passe são obrigatórios' });
    }

    const user = db.prepare('SELECT * FROM usuarios WHERE email = ? AND active = 1').get(email);

    if (!user || user.password_hash !== password) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }

    // Update last login
    db.prepare('UPDATE usuarios SET last_login = datetime(\'now\') WHERE id = ?').run(user.id);

    res.json({
      success: true,
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users
router.post('/', (req, res) => {
  try {
    const { id, name, email, password, role = 'leitor' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Nome, email e palavra-passe são obrigatórios' });
    }
    const newId = id || `usr-${Date.now()}`;
    db.prepare(`
      INSERT INTO usuarios (id, name, email, password_hash, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(newId, name, email, password, role);
    res.status(201).json({ success: true, id: newId, message: 'Utilizador criado com sucesso' });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ success: false, error: 'Email já está em uso' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  try {
    const { name, email, role, active, password } = req.body;
    if (password) {
      db.prepare(`
        UPDATE usuarios SET name=?, email=?, role=?, active=?, password_hash=?, updated_at=datetime('now')
        WHERE id=?
      `).run(name, email, role, active, password, req.params.id);
    } else {
      db.prepare(`
        UPDATE usuarios SET name=?, email=?, role=?, active=?, updated_at=datetime('now')
        WHERE id=?
      `).run(name, email, role, active, req.params.id);
    }
    res.json({ success: true, message: 'Utilizador actualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM usuarios WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Utilizador eliminado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
