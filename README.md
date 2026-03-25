# 🔴 PokéNexus 2026: The Ultimate Pokedex Expansion

![Version](https://img.shields.io/badge/Version-2.0.0-red?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_Node_|_MySQL-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-green?style=for-the-badge)

PokéNexus is a high-performance, full-stack Pokémon management system built with speed, security, and aesthetics in mind. This expansion brings advanced RPG mechanics, database optimization, and secure peer-to-peer trading.

---

## 🚀 Key Features

### 🛠️ Pokémon CRUD (Catch & Manage)
- **Catching System**: Dynamically capture any Pokémon from the Pokedex into your personal collection.
- **Training & Stats**: Increase your Pokémon's levels through a dedicated training system that boosts base stats.
- **Release Logic**: Safely remove Pokémon from your roster when needed.

### 🏆 Hall of Fame
A competitive dashboard displaying the **top 10 most powerful Pokémon** in the database, ranked by total base statistics.
- **Aggregated View**: Uses custom SQL views for real-time performance ranking.
- **Dynamic Stats**: Visual progress bars and power metrics.

### ⚡ Performance & Indexing
Designed to handle over **1000 records** without lag.
- **Query Optimization**: Implemented B-Tree indexing on core search fields.
- **Live Benchmarking**: Measure database response times directly from the UI.
- **Scalability**: Tested with a 1010+ Pokémon dataset.

### 🔒 Secure Trading (Transactions)
Trade Pokémon between trainers with absolute confidence.
- **ACID Transactions**: Uses `START TRANSACTION`, `COMMIT`, and `ROLLBACK` for zero-risk exchanges.
- **Locking Mechanism**: Utilizes `SELECT ... FOR UPDATE` to prevent race conditions during trades.
- **Atomic Operations**: All transfers happen as a single unit or don't happen at all.

### 💾 Safe Backups
- **Automated Backup**: Includes a full verified SQL dump (`copia_pokedex.sql`) of the core database.

---

## 🛠️ Tech Stack

- **Frontend**: 
  - [React 18](https://reactjs.org/) (Vite)
  - [Tailwind CSS](https://tailwindcss.com/) for a sleek "Cyber-Poké" design.
  - [Lucide Icons](https://lucide.dev/) for crisp vector iconography.
  - [Framer Motion](https://www.framer.com/motion/) for smooth micro-animations.
- **Backend**:
  - [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
  - [MySQL](https://www.mysql.com/) with `mysql2/promise` for robust performance.
  - [JWT](https://jwt.io/) for secure trainer authentication.

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Davidgh2611/Pokedex.git
   cd Pokedex
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on your DB credentials
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Database Import**:
   Import `backend/db/migrations.sql` and `backend/db/copia_pokedex.sql` into your local MySQL instance.

---

## 📸 Screenshots & Documentation

- Detailed implementation details can be found in the [Walkthrough](./walkthrough.md).
- Performance metrics available in the internal `/benchmark` tool.

---

### 🛡️ Developed by PokéNexus Team 2026
Built for speed. Optimized for battle.
