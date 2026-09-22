const express = require('express');
const router = express.Router();
const db = require('../database');

// Helper para formatar o objeto congregação retornado ao cliente
function formatCongregation(row, services = []) {
  return {
    id: row.id,
    name: row.name,
    official_name: row.official_name || 'Igreja Evangélica Congregacional em Angola',
    short_name: row.short_name || `IECA - ${row.name}`,
    synod: row.synod,
    pastorado: row.pastorado || null,
    pastor: row.pastor || null,
    province: row.province,
    city: row.city,
    municipality: row.municipality || null,
    neighborhood: row.neighborhood || null,
    address: row.address || null,
    phone: row.phone || null,
    email: row.email || null,
    lat: row.lat !== null && row.lat !== undefined ? Number(row.lat) : null,
    lng: row.lng !== null && row.lng !== undefined ? Number(row.lng) : null,
    members_count: row.members_count !== null && row.members_count !== undefined ? Number(row.members_count) : null,
    established_year: row.established_year !== null && row.established_year !== undefined ? Number(row.established_year) : null,
    google_maps: {
      place_id: row.google_place_id || null,
      plus_code: row.google_plus_code || null,
      url: row.google_url || null
    },
    status: row.status || 'A_VALIDAR',
    source: row.source || 'Google Maps',
    created_at: row.created_at,
    updated_at: row.updated_at,
    coordinates: {
      lat: row.lat !== null && row.lat !== undefined ? Number(row.lat) : null,
      lng: row.lng !== null && row.lng !== undefined ? Number(row.lng) : null
    },
    services: services.map(s => ({
      id: s.id,
      congregacao_id: s.congregacao_id,
      day: s.day,
      time: s.time,
      type: s.type
    }))
  };
}

// GET /api/congregacoes — listar todas com filtros flexíveis
router.get('/', (req, res) => {
  try {
    const { province, city, municipality, pastorado, synod, status, search } = req.query;
    let query = 'SELECT * FROM congregacoes WHERE 1=1';
    const params = [];

    if (province) { query += ' AND province = ?'; params.push(province); }
    if (city) { query += ' AND city = ?'; params.push(city); }
    if (municipality) { query += ' AND municipality = ?'; params.push(municipality); }
    if (pastorado) { query += ' AND pastorado LIKE ?'; params.push(`%${pastorado}%`); }
    if (synod) { query += ' AND synod LIKE ?'; params.push(`%${synod}%`); }
    if (status) { query += ' AND status = ?'; params.push(status); }

    if (search) {
      query += ' AND (name LIKE ? OR short_name LIKE ? OR city LIKE ? OR municipality LIKE ? OR address LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY province, name';
    const congregacoes = db.prepare(query).all(...params);

    const getCultos = db.prepare('SELECT * FROM congregacao_cultos WHERE congregacao_id = ?');
    const result = congregacoes.map(c => formatCongregation(c, getCultos.all(c.id)));

    res.json({ success: true, data: result, total: result.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/congregacoes/:id
router.get('/:id', (req, res) => {
  try {
    const cong = db.prepare('SELECT * FROM congregacoes WHERE id = ?').get(req.params.id);
    if (!cong) return res.status(404).json({ success: false, error: 'Congregação não encontrada' });

    const services = db.prepare('SELECT * FROM congregacao_cultos WHERE congregacao_id = ?').all(cong.id);
    res.json({ success: true, data: formatCongregation(cong, services) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/congregacoes/:id/services
router.get('/:id/services', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM congregacao_cultos WHERE congregacao_id = ?').all(req.params.id);
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/congregacoes
router.post('/', (req, res) => {
  try {
    const {
      id, name, official_name, short_name, synod, pastorado, pastor,
      province, city, municipality, neighborhood, address, phone, email,
      lat, lng, members_count, established_year, google_maps, status, source, services = []
    } = req.body;

    const newId = id || `cong-${Date.now()}`;
    const cleanName = name ? name.trim() : '';
    const cleanShortName = short_name || `IECA - ${cleanName}`;
    const cleanOfficialName = official_name || 'Igreja Evangélica Congregacional em Angola';

    // Validação de coordenadas
    if (lat !== undefined && lat !== null && (lat < -90 || lat > 90)) {
      return res.status(400).json({ success: false, error: 'Latitude deve estar entre -90 e 90' });
    }
    if (lng !== undefined && lng !== null && (lng < -180 || lng > 180)) {
      return res.status(400).json({ success: false, error: 'Longitude deve estar entre -180 e 180' });
    }

    db.prepare(`
      INSERT INTO congregacoes (
        id, name, official_name, short_name, synod, pastorado, pastor,
        province, city, municipality, neighborhood, address, phone, email,
        lat, lng, members_count, established_year,
        google_place_id, google_plus_code, google_url, status, source
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newId, cleanName, cleanOfficialName, cleanShortName, synod, pastorado || null, pastor || null,
      province, city, municipality || null, neighborhood || null, address || null, phone || null, email || null,
      lat !== undefined ? lat : null, lng !== undefined ? lng : null,
      members_count !== undefined ? members_count : null, established_year !== undefined ? established_year : null,
      google_maps?.place_id || null, google_maps?.plus_code || null, google_maps?.url || null,
      status || 'A_VALIDAR', source || 'Google Maps'
    );

    for (const s of services) {
      db.prepare('INSERT INTO congregacao_cultos (congregacao_id, day, time, type) VALUES (?, ?, ?, ?)').run(newId, s.day, s.time, s.type);
    }

    res.status(201).json({ success: true, message: 'Congregação criada com sucesso', id: newId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/congregacoes/:id
router.put('/:id', (req, res) => {
  try {
    const {
      name, official_name, short_name, synod, pastorado, pastor,
      province, city, municipality, neighborhood, address, phone, email,
      lat, lng, members_count, established_year, google_maps, status, source, services
    } = req.body;

    const existing = db.prepare('SELECT * FROM congregacoes WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ success: false, error: 'Congregação não encontrada' });

    db.prepare(`
      UPDATE congregacoes SET
        name=?, official_name=?, short_name=?, synod=?, pastorado=?, pastor=?,
        province=?, city=?, municipality=?, neighborhood=?, address=?, phone=?, email=?,
        lat=?, lng=?, members_count=?, established_year=?,
        google_place_id=?, google_plus_code=?, google_url=?, status=?, source=?,
        updated_at=datetime('now')
      WHERE id=?
    `).run(
      name || existing.name,
      official_name || existing.official_name,
      short_name || existing.short_name,
      synod || existing.synod,
      pastorado !== undefined ? pastorado : existing.pastorado,
      pastor !== undefined ? pastor : existing.pastor,
      province || existing.province,
      city || existing.city,
      municipality !== undefined ? municipality : existing.municipality,
      neighborhood !== undefined ? neighborhood : existing.neighborhood,
      address !== undefined ? address : existing.address,
      phone !== undefined ? phone : existing.phone,
      email !== undefined ? email : existing.email,
      lat !== undefined ? lat : existing.lat,
      lng !== undefined ? lng : existing.lng,
      members_count !== undefined ? members_count : existing.members_count,
      established_year !== undefined ? established_year : existing.established_year,
      google_maps?.place_id !== undefined ? google_maps.place_id : existing.google_place_id,
      google_maps?.plus_code !== undefined ? google_maps.plus_code : existing.google_plus_code,
      google_maps?.url !== undefined ? google_maps.url : existing.google_url,
      status || existing.status,
      source || existing.source,
      req.params.id
    );

    if (services && Array.isArray(services)) {
      db.prepare('DELETE FROM congregacao_cultos WHERE congregacao_id = ?').run(req.params.id);
      for (const s of services) {
        db.prepare('INSERT INTO congregacao_cultos (congregacao_id, day, time, type) VALUES (?, ?, ?, ?)').run(req.params.id, s.day, s.time, s.type);
      }
    }

    res.json({ success: true, message: 'Congregação actualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/congregacoes/:id
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM congregacoes WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Congregação eliminada com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
