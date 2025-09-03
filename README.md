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
- ESLint + Prettier (code style)
- Husky + lint-staged (pre-commit hooks)
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