# MERN Stack E-Commerce Platform

A production-ready, real-world full-stack E-Commerce Web Platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## 1. Project Overview
This application serves as a fully functional commercial e-commerce platform. It features complete authentication, product management, shopping cart, multi-step checkout, order history, and an administrative dashboard.

## 2. Features
* **User Authentication:** JWT based auth, login, registration, role-based access control.
* **Product Catalog:** Browse, search, filter, view details.
* **Shopping Cart:** Add, remove, update quantities, calculate totals with tax and shipping.
* **Checkout Flow:** Multi-step shipping, payment method, order summary.
* **Order Management:** Tracking, statuses, admin capabilities to mark delivered.
* **Admin Dashboard:** Manage products, users, orders.
* **Fully Responsive:** UI designed for desktop, tablet, and mobile.

## 3. Technology Stack
* **Frontend:** React.js (Vite), Redux Toolkit (RTK Query), React Router, Tailwind CSS.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose.
* **Security:** bcryptjs, jsonwebtoken, helmet, cors.

## 4. Folder Structure
```
mern-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── seeder.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── slices/
    │   ├── App.jsx
    │   └── main.jsx
    └── tailwind.config.js
```

## 5. Installation
Requirements: Node.js, MongoDB (local or Atlas cluster)

1. Clone or download the repository.
2. Navigate to `backend` and run `npm install`.
3. Navigate to `frontend` and run `npm install`.

## 6. Environment Variables
### Backend
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-ecommerce
JWT_SECRET=supersecretjwtkeythatshouldbechangedinproduction
JWT_EXPIRES_IN=30d
NODE_ENV=development
```

## 7. MongoDB Setup
Ensure MongoDB is running locally on port 27017 or update the `MONGO_URI` to your MongoDB Atlas connection string.

## 8. Seed Database Instructions
To load sample users and products, run:
```bash
cd backend
npm run data:import
```
To destroy all data:
```bash
npm run data:destroy
```
*Note: Admin user is `admin@example.com` with password `password123`.*

## 9. Running Backend
```bash
cd backend
npm run dev
```
Runs on `http://localhost:5000`

## 10. Running Frontend
```bash
cd frontend
npm run dev
```
Runs on `http://localhost:5173`

## 11. API Documentation
* `POST /api/auth/register` - Register user
* `POST /api/auth/login` - Authenticate user
* `GET /api/products` - Fetch all products
* `GET /api/products/:id` - Fetch single product
* `POST /api/orders` - Create order
* `GET /api/orders/myorders` - Get user orders

## 12. Testing
Test functionality by seeding the database and logging in with demo credentials.

## 13. Deployment
* **Backend:** Deploy on Render, Railway, or Heroku. Ensure environment variables are set.
* **Frontend:** Deploy on Vercel or Netlify. Set the base URL in RTK Query config.

## 14. Security Considerations
* Ensure `.env` is in `.gitignore`.
* Use strong JWT secrets in production.
* Add rate limiting for production.
* HTTPS required for production environments.
