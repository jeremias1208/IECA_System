/**
 * IECA System — Script de Sincronização do Hinário
 * Busca dados do endpoint remoto e guarda no SQLite local (cache)
 */

const db = require('./database');

const HINARIO_BASE_URL = 'https://hinario-api-7.onrender.com';
const ROUTES = ['hinos', 'litanias', 'oracoes', 'invocatorias', 'salmos'];

/**
 * Mapeia a rota do hinário para a tabela SQLite correspondente
 */
const ROUTE_TO_TABLE = {
  hinos: 'hinos',
  litanias: 'litanias',
  oracoes: 'oracoes',
  invocatorias: 'invocatorias',
  salmos: 'salmos'
};

/**
 * Busca dados de uma rota do hinário e guarda na DB
 */
async function syncRoute(route) {
  const tableName = ROUTE_TO_TABLE[route];
  const url = `${HINARIO_BASE_URL}/${route}`;

  console.log(`\n🔄 Sincronizando /${route}...`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const items = await response.json();

    if (!Array.isArray(items)) {
      throw new Error('Resposta não é um array JSON válido');
    }

    // Clear existing cache for this route
    db.prepare(`DELETE FROM ${tableName}`).run();

    // Insert new data
    const contentColumn = route === 'hinos' ? 'letra' : 'descricao';
    const insert = db.prepare(`
      INSERT INTO ${tableName} (id, numero, ${contentColumn}, idioma_id, idioma_nome)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((records) => {
      for (const item of records) {
        insert.run(
          String(item.id),
          item.numero || null,
          item.letra || item.descricao || item.deescricao || null,
          item.Idioma?.id || null,
          item.Idioma?.nome || null
        );
      }
    });

    insertMany(items);

    // Log sync
    db.prepare(`
      INSERT INTO sync_log (route, total_records, status, message)
      VALUES (?, ?, 'success', ?)
    `).run(route, items.length, `Sincronizados ${items.length} registos`);

    console.log(`✅ /${route}: ${items.length} registos sincronizados`);
    return { route, count: items.length, status: 'success' };

  } catch (error) {
    const msg = error.message;
    console.error(`❌ /${route}: ${msg}`);

    db.prepare(`
      INSERT INTO sync_log (route, total_records, status, message)
      VALUES (?, 0, 'error', ?)
    `).run(route, msg);

    return { route, count: 0, status: 'error', error: msg };
  }
}

/**
 * Sincroniza todas as rotas do hinário
 */
async function syncAllHinario() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📖 IECA — Sincronização do Hinário');
  console.log(`🌐 Fonte: ${HINARIO_BASE_URL}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const results = [];

  for (const route of ROUTES) {
    const result = await syncRoute(route);
    results.push(result);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Resumo da Sincronização:');
  for (const r of results) {
    const icon = r.status === 'success' ? '✅' : '❌';
    console.log(`  ${icon} /${r.route}: ${r.count} registos`);
  }

  const total = results.reduce((sum, r) => sum + r.count, 0);
  const errors = results.filter(r => r.status === 'error').length;
  console.log(`\n🎵 Total: ${total} itens | Erros: ${errors}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return results;
}

// Run if called directly
if (require.main === module) {
  syncAllHinario().catch(console.error);
}

module.exports = { syncAllHinario, syncRoute };
