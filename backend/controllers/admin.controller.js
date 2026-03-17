const db = require('../db/connection');

const adminController = {
    createPokemon: async (req, res) => {
        const { id, nombre, tipo_principal, tipo_secundario, nivel, ataque, defensa, velocidad } = req.body;

        await db.execute(
            `INSERT INTO pokemon (id, nombre, tipo_principal, tipo_secundario, nivel, ataque, defensa, velocidad) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, nombre, tipo_principal, tipo_secundario, nivel, ataque, defensa, velocidad]
        );

        res.status(201).json({ message: 'Pokémon creado con éxito', id });
    },

    updatePokemon: async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo_principal, tipo_secundario, nivel, ataque, defensa, velocidad } = req.body;

        await db.execute(
            `UPDATE pokemon SET nombre = ?, tipo_principal = ?, tipo_secundario = ?, nivel = ?, 
             ataque = ?, defensa = ?, velocidad = ? WHERE id = ?`,
            [nombre, tipo_principal, tipo_secundario, nivel, ataque, defensa, velocidad, id]
        );

        res.json({ message: 'Pokémon actualizado con éxito' });
    },

    deletePokemon: async (req, res) => {
        const { id } = req.params;
        await db.execute('DELETE FROM pokemon WHERE id = ?', [id]);
        res.json({ message: 'Pokémon eliminado con éxito' });
    }
};

module.exports = adminController;
