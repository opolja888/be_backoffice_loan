เข้าใจเลยครับ 🙌 ถ้าคุณอยากให้ README มีส่วน ENV อยู่ด้วย (ไม่ต้องไปเปิด .env.example) เราสามารถเพิ่ม Section 📂 ENV ต่อท้าย README ได้เลยครับ แบบนี้:

⸻


# 📘 BE Backoffice Loan

Backend service พัฒนาด้วย **Node.js (Express)** + **PostgreSQL** + **TypeORM**  
โครงสร้างแบบ feature-first แยกเป็นโมดูล ลด conflict เวลาทำงานเป็นทีม

---

## 🚀 Tech Stack
- Node.js (ES Modules)
- Express.js
- PostgreSQL
- TypeORM v0.3
- Zod (input validation)
- Docker (optional for DB)

---

## 📂 Project Structure

```bash
src/
  config/              # การตั้งค่า (db, env, etc.)
  middlewares/         # middleware กลาง เช่น error-handler
  loaders/             # auto loader เช่น routes
  modules/             # แต่ละ feature ของระบบ
    user/
      user.schema.js
      user.controller.js
      user.service.js
      user.routes.js
      user.validations.js
  utils/               # helper functions ใช้ซ้ำ
  app.js               # สร้าง express app
  server.js            # entry point, init db แล้ว start server


⸻

📂 ENV

สร้างไฟล์ .env ที่ root ของโปรเจกต์ และกำหนดค่าดังนี้:

# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=loan_db

# Config Docker pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin


⸻

🗄️ Database Setup

วิธีที่ 1: ติดตั้ง PostgreSQL บนเครื่อง
	1.	ติดตั้ง PostgreSQL
	2.	สร้าง database และ user ตาม .env

CREATE USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE loan_db OWNER postgres;


⸻

วิธีที่ 2: ใช้ Docker Compose
	1.	สร้าง docker-compose.yml
	2.	รัน

docker compose up -d

	3.	เข้าใช้งาน http://localhost:5050 เพื่อเปิด pgAdmin

⸻

🧪 Scripts

npm run dev             # run dev ด้วย nodemon
npm run start           # run prod ด้วย node

---