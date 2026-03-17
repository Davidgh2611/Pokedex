-- Migrations for Pokédex 2026 Expansion

-- Table for users
CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for favorites
CREATE TABLE IF NOT EXISTS favoritos (
    user_id INT UNSIGNED NOT NULL,
    pokemon_id INT UNSIGNED ZEROFILL NOT NULL,
    PRIMARY KEY (user_id, pokemon_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE
);

-- Table for teams
CREATE TABLE IF NOT EXISTS equipos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    name VARCHAR(100) DEFAULT 'Nuevo Equipo',
    pokemon_ids JSON NOT NULL, -- Array of up to 6 IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
