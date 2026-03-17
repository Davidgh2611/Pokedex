const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const passwordHash = await bcrypt.hash(password, 10);
            const [result] = await db.execute(
                'INSERT INTO usuarios (username, email, password_hash) VALUES (?, ?, ?)',
                [username, email, passwordHash]
            );

            res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El nombre de usuario o email ya existe' });
            }
            throw error;
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        const [users] = await db.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
        const user = users[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret_nexus_2026',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });
    }
};

module.exports = authController;
