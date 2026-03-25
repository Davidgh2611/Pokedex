const pool = require('../db/connection');

async function capturePokemon(userId, pokemonId, nivel = 1) {
    // Get base stats from the pokedex
    const [[baseStats]] = await pool.query('SELECT ataque, defensa, velocidad FROM pokemon WHERE id = ?', [pokemonId]);
    
    if (!baseStats) {
        throw new Error('Pokemon base no encontrado');
    }

    // Insert new captured pokemon
    const [result] = await pool.query(
        'INSERT INTO pokemon_capturado (user_id, pokemon_id, nivel, ataque, defensa, velocidad) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, pokemonId, nivel, baseStats.ataque, baseStats.defensa, baseStats.velocidad]
    );
    
    return { insertId: result.insertId };
}

async function getCapturedPokemon(userId) {
    const [rows] = await pool.query(`
        SELECT pc.id, pc.pokemon_id, p.nombre, p.tipo_principal, pc.nivel, pc.ataque, pc.defensa, pc.velocidad, pc.created_at
        FROM pokemon_capturado pc
        JOIN pokemon p ON pc.pokemon_id = p.id
        WHERE pc.user_id = ?
    `, [userId]);
    return rows;
}

async function trainPokemon(id, userId, levelIncrease = 1, statIncrease = 5) {
    // Verify ownership
    const [[pokemon]] = await pool.query('SELECT * FROM pokemon_capturado WHERE id = ? AND user_id = ?', [id, userId]);
    
    if (!pokemon) {
        throw new Error('Pokémon no encontrado o no pertenece al usuario');
    }

    // Logic for evolution could be added here, for now just increase stats
    const nuevoNivel = pokemon.nivel + levelIncrease;
    const nuevoAtaque = pokemon.ataque + statIncrease;
    const nuevoDefensa = pokemon.defensa + statIncrease;
    const nuevoVelocidad = pokemon.velocidad + statIncrease;

    // TODO: Verify evolution table or species table to change pokemon_id if level requirement is met

    await pool.query(
        'UPDATE pokemon_capturado SET nivel = ?, ataque = ?, defensa = ?, velocidad = ? WHERE id = ?',
        [nuevoNivel, nuevoAtaque, nuevoDefensa, nuevoVelocidad, id]
    );

    return { message: 'Pokémon entrenado con éxito', nuevoNivel };
}

async function releasePokemon(id, userId) {
    const [result] = await pool.query('DELETE FROM pokemon_capturado WHERE id = ? AND user_id = ?', [id, userId]);
    if (result.affectedRows === 0) {
        throw new Error('Pokémon no encontrado o no pertenece al usuario');
    }
    return true;
}

module.exports = { capturePokemon, getCapturedPokemon, trainPokemon, releasePokemon };
