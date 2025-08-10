
# Employee Dashboard Backend

Backend for the Employee Dashboard assignment (Node.js + Express + MongoDB)

## Features
- JWT-based authentication for admin/HR users
- Employee CRUD (create, read, update, delete)
- Filtering, sorting, pagination, and search support
- Seed script to create an admin user and sample employees
- Clear folder structure and commented code

## Folder structure
```
/employee-dashboard-backend
├─ config/
│  └─ db.js
├─ controllers/
│  ├─ authController.js
│  └─ employeeController.js
├─ middleware/
│  └─ auth.js
├─ models/
│  ├─ User.js
│  └─ Employee.js
├─ routes/
│  ├─ auth.js
│  └─ employees.js
├─ seed/
│  └─ seed.js
├─ server.js
├─ package.json
└─ README.md
```

## Getting started
1. Copy `.env.example` to `.env` and update if needed:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/studentdb
   JWT_SECRET=supersecretjwtkey
   PORT=8080
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Seed the database (creates admin user `admin@example.com` / `admin123` and sample employees):
   ```
   npm run seed
   ```

4. Start server:
   ```
   npm run dev
   ```

## API Documentation (brief)
All `/api/employees` endpoints are protected. Provide header:
`Authorization: Bearer <token>`

### Auth
- `POST /api/auth/register` - create admin user (name, email, password)
- `POST /api/auth/login` - login (email, password) => returns `{ token }`

### Employees
- `POST /api/employees` - create employee (json body)
- `GET /api/employees` - list employees with query params:
    - `page`, `limit`
    - `submitted=true|false`
    - `role=Frontend Developer`
    - `tag=AI Enthusiast`
    - `minScore`, `maxScore`
    - `sortBy=name|submission_date|learning_attitude_score`
    - `sortDir=asc|desc`
    - `search=keyword`
- `GET /api/employees/:id` - get detail
- `PUT /api/employees/:id` - update employee
- `DELETE /api/employees/:id` - delete employee

## Notes
- This code is intended for development / learning. For production, add rate limiting,
  strong validation, more robust search (text indexes), and role-based access control.
