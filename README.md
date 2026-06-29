# 🩸 AI Blood Donation Management System

An AI-powered web application that connects blood donors, patients, and hospitals to provide faster and smarter blood donation services during emergencies.

The system uses Artificial Intelligence to recommend suitable blood donors based on blood group, location, availability, and emergency priority. It also provides secure authentication, blood request management, donation history, and an AI chatbot to assist users.

---

## 📌 Project Information

**Project Name:** AI Blood Donation Management System

**Course:** CSE4204 – Software Engineering

**Team ID:** CSE4204-8D-T05

**Section:** 8D

---

## 👥 Team Members

 Name                 | Student ID  | Responsibility                            

 Nusrat Jahan Sarna    11220320968  Team Leader, Documentation, GitHub
 Farhana Rahman Adiba  11220320976  API ,testing                      
 Arpita Biswas         11220320978  Frontend Development                       
 Nazia Musharrat Neha  11220321039  Backend Development                

---

# ✨ Features

### Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Encryption using bcrypt
* Role-Based Authorization

### Donor Management

* Register as Blood Donor
* Update Donor Information
* Manage Availability
* View Donation History

### Patient Features

* Request Blood
* Search Blood Donors
* Track Request Status

### Hospital Features

* Manage Blood Requests
* View Available Donors
* Update Emergency Requests

### AI Features

* AI Donor Recommendation
* Emergency Priority Scoring
* AI Chatbot (Google Gemini API)
* Donor Availability Prediction

### Admin Features

* Manage Users
* Manage Blood Requests
* View Reports
* System Monitoring

---

# 🛠 Technology Stack

## Frontend

* React.js

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Authentication

* JWT
* bcrypt

## AI

* Google Gemini API

## Other Tools

* Google Maps API
* Firebase (Notifications)
* Postman
* GitHub

---

# 🏗 System Architecture

```text
React.js
     │
     ▼
Node.js + Express.js
     │
     ▼
PostgreSQL
     │
     ▼
Google Gemini API
```

---

# 📂 Repository Structure

```text
AI-Blood-Donation-Management-System
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
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
│   ├── ProjectProposal.pdf
│   ├── SRS.pdf
│   ├── SystemDesign.pdf
│   ├── BackendProgress.pdf
│   ├── UIDesign.pdf
│   ├── ERDiagram.pdf
│   ├── UseCaseDiagram.pdf
│   ├── ActivityDiagram.pdf
│   └── APICollection.json
│
├── postman/
│   └── AI-Blood-Donation-System.postman_collection.json
│
├── README.md
└── .gitignore
```

---

# 🚀 Implemented Modules

* User Authentication
* JWT Authorization
* Password Encryption
* Donor Management
* Patient Management
* Hospital Management
* Blood Request Management
* Donation History
* PostgreSQL Database
* RESTful APIs
* AI Chatbot
* AI Donor Recommendation
* Error Handling
* Input Validation
* API Testing

---

# 🔗 REST API Endpoints

## Authentication

| Method | Endpoint           

 POST    /api/auth/register 
 POST    /api/auth/login    
 POST    /api/auth/logout   

---

## User

| Method | Endpoint           

 GET     /api/users/profile 
 PUT     /api/users/profile 

---

## Donor

| Method | Endpoint        

 GET     /api/donors     
 GET     /api/donors/:id 
 PUT     /api/donors/:id 

---

## Blood Request

| Method | Endpoint          

 POST    /api/requests     
 GET     /api/requests     
 PUT     /api/requests/:id 

---

## AI

 Method  Endpoint            
 
 POST    /api/chat           
 POST    /api/recommendation 

---

# 🗄 Database

The project uses PostgreSQL with relational tables.

Main tables include:

* Users
* Donors
* Patients
* Hospitals
* Blood Requests
* Donation History

All tables use proper primary keys, foreign keys, validations, and relationships.



---

# 🧪 API Testing

All APIs have been tested using Postman.

Tested Features:

* User Registration
* Login
* JWT Authentication
* CRUD Operations
* Validation Rules
* Error Responses
* Database Connectivity

---



# ⚙ Installation

```bash
git clone https://github.com/your-username/AI-Blood-Donation-Management-System.git

cd AI-Blood-Donation-Management-System

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm start
```

---


---




