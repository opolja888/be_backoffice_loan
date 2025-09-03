Sure thing 🙌 Here’s a complete README.md file in English with ENV and database setup instructions included.
You can copy this as README.md at the root of your project:

⸻


# 📘 BE Backoffice Loan

Backend service built with **Node.js (Express)** + **PostgreSQL** + **TypeORM**  
Designed with a **feature-first structure** to minimize conflicts when working in a team.

---

## 🚀 Tech Stack
- Node.js (ES Modules)
- Express.js
- PostgreSQL
- TypeORM v0.3
- Zod (input validation)
- ESLint + Prettier (code style)
- Husky + lint-staged (pre-commit hooks)
- Docker (optional for DB)

---

## 📂 Project Structure

```bash
src/
  config/              # configuration (db, env, etc.)
  middlewares/         # global middlewares (e.g., error-handler)
  loaders/             # auto loaders (e.g., routes)
  modules/             # feature-based modules
    user/
      user.schema.js
      user.controller.js
      user.service.js
      user.routes.js
      user.validations.js
  utils/               # reusable helper functions
  app.js               # create express app
  server.js            # entry point, initialize db and start server


⸻

📂 ENV

Create a .env file in the project root and configure it like this:

# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=loan_db

# Docker pgAdmin Config
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

💡 Tip: Commit a .env.example file (with placeholder values) so the team knows what environment variables are required.


🗄️ Database Setup

Option 1: Install PostgreSQL locally
	1.	Install PostgreSQL.
	2.	Create a database and user according to your .env file:

CREATE USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE loan_db OWNER postgres;

	3.	Test the connection:

psql -h localhost -U postgres -d loan_db


Option 2: Use Docker Compose
	1.	Create a docker-compose.yml file in the project root with the following content:

version: '3.9'
services:
  postgres:
    image: postgres:latest
    container_name: postgres_loan
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - volume_loan:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - network_loan

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin_loan
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - network_loan

volumes:
  volume_loan:
    name: volume_loan
    driver: local

networks:
  network_loan:
    name: network_loan
    driver: bridge

	2.	Start the containers:

docker compose up -d

	3.	Access pgAdmin at http://localhost:5050.
	•	Login with PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD.
	•	Add a new server with host = postgres (the service name in docker-compose).


🧪 Scripts

npm run dev             # run in development mode with nodemon
npm run start           # run in production mode with node
