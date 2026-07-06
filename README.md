# 🩸 AI Blood Donation Management System

<p align="center">
An AI-powered web application that connects <strong>blood donors</strong>, <strong>patients</strong>, and <strong>hospitals</strong> to make blood donation faster, smarter, and more efficient during emergencies.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Gemini](https://img.shields.io/badge/Google-Gemini-red)
![Status](https://img.shields.io/badge/Status-Frontend%20%26%20Backend%20Completed-success)

</p>

---

# 📖 Table of Contents

* About
* Features
* Technology Stack
* System Architecture
* Repository Structure
* Database
* REST API
* Authentication
* Installation
* Environment Variables
* Documentation
* Team Members
* Project Status
* Future Improvements
* License

---

# 📌 About

The AI Blood Donation Management System helps patients quickly find compatible blood donors using Artificial Intelligence.

The application provides:

* Secure user authentication
* Blood donor registration
* Blood request management
* Hospital management
* AI-based donor recommendation
* AI chatbot assistance
* Emergency request prioritization
* Donation history tracking

---

# ✨ Features

## Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Encryption (bcrypt)
* Role-Based Authorization

## Donor Module

* Register Donor
* Update Donor Profile
* Manage Availability
* Donation History

## Patient Module

* Request Blood
* Search Donors
* Track Requests

## Hospital Module

* Hospital Dashboard
* Manage Requests
* View Available Donors

## AI Module

* AI Donor Recommendation
* Emergency Priority Prediction
* AI Chatbot
* Donor Availability Prediction

## Admin Module

* User Management
* Blood Request Monitoring
* Reports & Analytics

---

# 🛠 Technology Stack

| Layer           | Technology           |
| --------------- | -------------------- |
| Frontend        | React.js             |
| Backend         | Node.js + Express.js |
| Database        | PostgreSQL           |
| Authentication  | JWT + bcrypt         |
| AI              | Google Gemini API    |
| Maps            | Google Maps API      |
| Notifications   | Firebase             |
| API Testing     | Postman              |
| Version Control | Git & GitHub         |

---

# 🏗 System Architecture

```text
React.js Frontend
        │
        ▼
Express.js REST API
        │
        ▼
PostgreSQL Database
        │
        ▼
Google Gemini API
```

---

# 📂 Repository Structure

```text
AI-Blood-Donation-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
│
├── documentation/
│
├── postman/
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

# 🗄 Database

The PostgreSQL database contains the following tables:

* Users
* Donors
* Patients
* Hospitals
* Blood Requests
* Donation History

The database includes:

* Primary Keys
* Foreign Keys
* Relationships
* Constraints
* Input Validation

---

# 🔗 REST API

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| POST   | /api/auth/logout   |

### User

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/users/profile |
| PUT    | /api/users/profile |

### Donor

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/donors     |
| GET    | /api/donors/:id |
| PUT    | /api/donors/:id |

### Blood Requests

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/requests     |
| GET    | /api/requests     |
| PUT    | /api/requests/:id |

### AI

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/chat           |
| POST   | /api/recommendation |

---

# 🔐 Authentication

The project uses:

* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes
* Role-Based Authorization

---

# 🧪 API Testing

API testing is completed using Postman.

Verified:

* User Registration
* Login
* Authentication
* CRUD Operations
* Error Handling
* Database Connectivity

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/AI-Blood-Donation-Management-System.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# ⚙ Environment Variables

Backend `.env`

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# 📚 Documentation

Project documentation includes:

* Proposal
* SRS
* UI/UX Design
* System Design
* Backend Progress
* Frontend Progress
* ER Diagram
* Use Case Diagram
* Activity Diagram
* API Collection

---

# 👥 Team Members

| Name                 | Student ID  | Responsibility                     |
| -------------------- | ----------- | ---------------------------------- |
| Nusrat Jahan Sarna   | 11220320968 | Team Leader, Documentation, GitHub |
| Farhana Rahman Adiba | 11220320976 | API Development & Testing          |
| Arpita Biswas        | 11220320978 | Frontend Development               |
| Nazia Musharrat Neha | 11220321039 | Backend Development                |

---

# 📈 Project Status

| Module               | Status         |
| -------------------- | -------------- |
| UI/UX Design         | ✅ Completed    |
| Frontend Development | ✅ Completed    |
| Backend Development  | ✅ Completed    |
| PostgreSQL Database  | ✅ Completed    |
| REST APIs            | ✅ Completed    |
| Authentication       | ✅ Completed    |
| API Integration      | ✅ Completed    |
| AI Integration       | ✅ Completed    |
| API Testing          | ✅ Completed    |
| Documentation        | ✅ Completed    |
| Deployment           | 🚧 In Progress |

---



