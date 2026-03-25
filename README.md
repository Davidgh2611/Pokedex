# 🔴 PokéNexus 2026: La Expansión Definitiva de la Pokedex

![Versión](https://img.shields.io/badge/Versión-2.0.0-red?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Node_|_MySQL-blue?style=for-the-badge)
![Estado](https://img.shields.io/badge/Estado-Completado-green?style=for-the-badge)

PokéNexus es un sistema de gestión de Pokémon de alto rendimiento, diseñado con velocidad, seguridad y una estética futurista "Cyber-Poké". Esta expansión introduce mecánicas avanzadas de RPG, optimización de base de datos a gran escala y un sistema de intercambio seguro entre entrenadores.

---

## 🚀 Funcionalidades Clave

### 🛠️ CRUD de Pokémon (Captura y Gestión)
- **Sistema de Captura**: Captura dinámicamente cualquier Pokémon de la Pokedex a tu colección personal desde la interfaz.
- **Entrenamiento y Estadísticas**: Sube de nivel a tus Pokémon mediante un sistema de entrenamiento que mejora sus estadísticas base (Ataque, Defensa y Velocidad).
- **Liberación**: Gestiona tu equipo eliminando Pokémon de tu colección de forma segura cuando lo necesites.

### 🏆 Salón de la Fama (Hall of Fame)
Un panel competitivo que muestra los **10 Pokémon más poderosos** de la base de datos, ordenados por la suma de sus estadísticas base.
- **Vista Agregada**: Implementado mediante vistas SQL personalizadas para un ranking en tiempo real.
- **Métricas de Poder**: Barras de progreso visuales y estadísticas detalladas por cada Pokémon.

### ⚡ Rendimiento e Indexación
Diseñado para manejar más de **1000 registros** sin latencia perceptible.
- **Optimización de Consultas**: Implementación de índices B-Tree en campos clave de búsqueda.
- **Benchmarking en Vivo**: Herramienta integrada para medir los tiempos de respuesta de la base de datos directamente desde la UI.
- **Escalabilidad**: Testeado con un dataset de más de 1010 Pokémon de varias generaciones.

### 🔒 Transacciones Seguras (Intercambios)
Intercambia Pokémon con otros entrenadores con total confianza.
- **Transacciones ACID**: Utiliza `START TRANSACTION`, `COMMIT`, y `ROLLBACK` para garantizar que los intercambios se realicen correctamente o no ocurran en absoluto.
- **Bloqueo Preventivo**: Emplea `SELECT ... FOR UPDATE` para evitar condiciones de carrera durante los intercambios concurrentes.
- **Operaciones Atómicas**: Ambos cambios de dueño ocurren como una unidad lógica indivisible.

### 🔑 Autenticación Nexus
- **Seguridad JWT**: Sistema de login y registro integrado para proteger tu equipo personal.
- **Control de Acceso**: Rutas protegidas que aseguran que solo tú puedas gestionar tus Pokémon capturados.

### 💾 Backups de Seguridad
- **Copia de Respaldo**: Incluye un volcado SQL verificado (`copia_pokedex.sql`) con toda la estructura y datos expandidos.

---

## 🛠️ Stack Tecnológico

- **Frontend**: 
  - [React 18](https://reactjs.org/) (Vite)
  - [Tailwind CSS](https://tailwindcss.com/) para un diseño "Cyber-Poké" inmersivo.
  - [Lucide Icons](https://lucide.dev/) para iconografía vectorial nítida.
  - [Framer Motion](https://www.framer.com/motion/) para micro-animaciones fluidas.
- **Backend**:
  - [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
  - [MySQL](https://www.mysql.com/) con `mysql2/promise` para operaciones asíncronas.
  - [JWT](https://jwt.io/) para autenticación segura basada en tokens.

---

## 📦 Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Davidgh2611/Pokedex.git
   cd Pokedex
   ```

2. **Configuración del Backend**:
   ```bash
   cd backend
   npm install
   # Crea un archivo .env basándote en tus credenciales de DB
   npm run dev
   ```

3. **Configuración del Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Importación de Base de Datos**:
   Importa `backend/db/migrations.sql` y `backend/db/copia_pokedex.sql` en tu instancia local de MySQL.

---

## 🛡️ Desarrollado por el Equipo PokéNexus 2026
Construido para la velocidad. Optimizado para el combate.
