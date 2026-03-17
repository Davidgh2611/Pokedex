const pool = require('../db/connection');

/**
 * Get paginated, filtered and sorted list of Pokémon
 */
async function findAll({ page = 1, limit = 10, name = '', type = '', sort = 'id' } = {}) {
    const offset = (page - 1) * limit;
    const validSorts = { id: 'id', nombre: 'nombre', nivel: 'nivel', ataque: 'ataque', defensa: 'defensa', velocidad: 'velocidad' };
    const orderCol = validSorts[sort] || 'id';

    const conditions = [];
    const params = [];

    if (name) {
        conditions.push('nombre LIKE ?');
        params.push(`%${name}%`);
    }
    if (type) {
        conditions.push('tipo_principal = ?');
        params.push(type);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    // Total count for pagination meta
    const countSql = `SELECT COUNT(*) AS total FROM pokemon ${where}`;
    const [countRows] = await pool.query(countSql, params);
    const total = countRows[0].total;

    // Paginated data
    const dataSql = `SELECT * FROM pokemon ${where} ORDER BY ${orderCol} ASC LIMIT ? OFFSET ?`;
    const [rows] = await pool.query(dataSql, [...params, parseInt(limit), parseInt(offset)]);

    return {
        data: rows,
        meta: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
}

/**
 * Get single Pokémon by ID
 */
async function findById(id) {
    const [rows] = await pool.query('SELECT * FROM pokemon WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Search Pokémon by name (for real-time search)
 */
async function search(query) {
    if (!query || query.trim() === '') return [];
    const [rows] = await pool.query(
        'SELECT * FROM pokemon WHERE nombre LIKE ? LIMIT 20',
        [`%${query}%`]
    );
    return rows;
}

/**
 * Get all distinct types for filter dropdown
 */
async function getTypes() {
    const [rows] = await pool.query(
        'SELECT DISTINCT tipo_principal FROM pokemon ORDER BY tipo_principal ASC'
    );
    return rows.map(r => r.tipo_principal);
}

module.exports = { findAll, findById, search, getTypes };
