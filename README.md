# Courier Management System (MERN Stack)

A full-stack web application for managing courier and parcel delivery operations, built with **MongoDB, Express.js, React, and Node.js**. It lets customers book and track parcels, couriers handle deliveries, and admins oversee the entire operation.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Customer
- Register, log in, and manage profile
- Book a parcel with sender/receiver details, weight, and delivery type
- Automatic delivery charge calculation
- Real-time parcel tracking using a tracking ID
- View booking history and delivery status
- Cancel pending bookings

### Courier / Delivery Agent
- View assigned deliveries
- Update parcel status (Picked Up, In Transit, Out for Delivery, Delivered)
- Record delivery confirmation

### Admin
- Dashboard with statistics (total parcels, revenue, active couriers)
- Manage users, couriers, and branches
- Assign parcels to couriers
- Manage pricing and delivery types
- Generate reports

### General
- JWT-based authentication and role-based authorization
- Responsive UI
- Secure password hashing with bcrypt
- Input validation and centralized error handling

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React, React Router, Axios, Tailwind CSS / Bootstrap |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB with Mongoose ODM               |
| Auth       | JSON Web Tokens (JWT), bcryptjs         |
| Tools      | Nodemon, dotenv, CORS, Postman          |

---

## Project Structure

```
courier-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── parcelController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Parcel.js
│   │   └── Branch.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── parcelRoutes.js
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Git](https://git-scm.com/)

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/courier-management-system.git
   cd courier-management-system
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/courier_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Running the App

**Start the backend server:**

```bash
cd backend
npm run dev
```

**Start the frontend:**

```bash
cd frontend
npm start
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description           | Access  |
|--------|----------------------|-----------------------|---------|
| POST   | `/api/auth/register` | Register a new user   | Public  |
| POST   | `/api/auth/login`    | Log in and get token  | Public  |
| GET    | `/api/auth/me`       | Get current user      | Private |

### Parcels

| Method | Endpoint                    | Description                    | Access          |
|--------|-----------------------------|--------------------------------|-----------------|
| POST   | `/api/parcels`              | Book a new parcel              | Customer        |
| GET    | `/api/parcels`              | Get all parcels (role-based)   | Private         |
| GET    | `/api/parcels/:id`          | Get parcel details             | Private         |
| GET    | `/api/parcels/track/:trackingId` | Track a parcel            | Public          |
| PUT    | `/api/parcels/:id/status`   | Update parcel status           | Courier / Admin |
| PUT    | `/api/parcels/:id/assign`   | Assign parcel to a courier     | Admin           |
| DELETE | `/api/parcels/:id`          | Cancel / delete a parcel       | Customer / Admin|

### Admin

| Method | Endpoint                | Description              | Access |
|--------|-------------------------|--------------------------|--------|
| GET    | `/api/admin/users`      | List all users           | Admin  |
| GET    | `/api/admin/stats`      | Dashboard statistics     | Admin  |
| PUT    | `/api/admin/users/:id`  | Update user / role       | Admin  |
| DELETE | `/api/admin/users/:id`  | Delete a user            | Admin  |

> Protected routes require the header: `Authorization: Bearer <token>`

---

## Database Models

### User

```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: "customer" | "courier" | "admin",
  createdAt: Date
}
```

### Parcel

```js
{
  trackingId: String (unique),
  sender: ObjectId (ref: User),
  receiver: { name, phone, address, city },
  weight: Number,
  deliveryType: "standard" | "express" | "same-day",
  charge: Number,
  status: "pending" | "picked-up" | "in-transit" | "out-for-delivery" | "delivered" | "cancelled",
  assignedCourier: ObjectId (ref: User),
  statusHistory: [{ status, timestamp, note }],
  createdAt: Date
}
```

---

## User Roles

| Role     | Permissions                                                      |
|----------|------------------------------------------------------------------|
| Customer | Book, track, and cancel own parcels                              |
| Courier  | View assigned parcels and update delivery status                 |
| Admin    | Full access: manage users, parcels, assignments, and reports     |

---

## Screenshots

> Add screenshots of your application here.

| Page            | Preview                          |
|-----------------|----------------------------------|
| Home / Tracking | `![Home](screenshots/home.png)`  |
| Dashboard       | `![Dashboard](screenshots/dashboard.png)` |
| Booking Form    | `![Booking](screenshots/booking.png)` |

---

## Future Improvements

- Email / SMS notifications on status changes
- Live GPS tracking with maps integration
- Online payment gateway (Stripe, PayPal, JazzCash, Easypaisa)
- PDF invoice and shipping label generation
- Barcode / QR code scanning
- Multi-language support
- Docker deployment and CI/CD pipeline

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Your Name**
GitHub: [@your-username](https://github.com/your-username)
