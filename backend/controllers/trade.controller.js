const pool = require('../db/connection');

const tradeController = {
    /**
     * Intercambio seguro de Pokémon entre dos entrenadores.
     * Implementado con transacciones SQL para asegurar atomicidad.
     */
    trade: async (req, res) => {
        const userId1 = req.user.id; // Entrenador 1 (autenticado)
        const { pokemonId1, trainerId2, pokemonId2 } = req.body;

        if (!pokemonId1 || !trainerId2 || !pokemonId2) {
            return res.status(400).json({ error: 'Faltan parámetros para el intercambio' });
        }

        const conn = await pool.getConnection();

        try {
            // ─── START TRANSACTION ─────────────────────────────────────────────
            await conn.beginTransaction();
            console.log(` Iniciando transacción de intercambio: User ${userId1} ↔ User ${trainerId2}`);

            // 1. Verificar propiedad del Pokémon 1
            const [[p1]] = await conn.query(
                'SELECT * FROM pokemon_capturado WHERE id = ? AND user_id = ? FOR UPDATE',
                [pokemonId1, userId1]
            );
            if (!p1) throw new Error(`El Pokémon ${pokemonId1} no pertenece al Entrenador 1`);

            // 2. Verificar propiedad del Pokémon 2
            const [[p2]] = await conn.query(
                'SELECT * FROM pokemon_capturado WHERE id = ? AND user_id = ? FOR UPDATE',
                [pokemonId2, trainerId2]
            );
            if (!p2) throw new Error(`El Pokémon ${pokemonId2} no pertenece al Entrenador 2`);

            // 3. Realizar transferencia 1 -> 2
            await conn.query(
                'UPDATE pokemon_capturado SET user_id = ? WHERE id = ?',
                [trainerId2, pokemonId1]
            );

            // 4. Realizar transferencia 2 -> 1
            await conn.query(
                'UPDATE pokemon_capturado SET user_id = ? WHERE id = ?',
                [userId1, pokemonId2]
            );

            // ─── COMMIT ────────────────────────────────────────────────────────
            await conn.commit();
            console.log('✅ Intercambio completado con éxito.');
            
            res.json({ message: 'Intercambio realizado con éxito' });

        } catch (error) {
            // ─── ROLLBACK ──────────────────────────────────────────────────────
            await conn.rollback();
            console.error('❌ Error en el intercambio, realizando ROLLBACK:', error.message);
            res.status(500).json({ error: 'El intercambio falló y se revirtieron los cambios: ' + error.message });
        } finally {
            conn.release();
        }
    }
};

module.exports = tradeController;
