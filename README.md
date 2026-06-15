# AI Blood Donation Management System

## Team Information

**Project Name:** AI Blood Donation Management System

**Team ID:** CSE4204-8D-T05

**Section:** 8D

### Team Leader

* Nusrat Jahan Sarna (ID: 11220320968)

### Team Members

* Farhana Rahman Adiba (ID: 11220320976)
* Arpita Biswas (ID: 11220320978)
* Nazia Musharrat Neha (ID: 11220321039)

---

# Project Overview

The AI Blood Donation Management System is a smart web-based platform designed to connect blood donors, patients, and hospitals. The system uses Artificial Intelligence (AI) to quickly find suitable blood donors based on blood group, location, and availability.

The main goal of this project is to reduce the time required to find compatible blood during emergencies and improve communication between donors, patients, and hospitals.

---

# Problem Statement

Finding blood during emergencies is often difficult and time-consuming. Most people still depend on phone calls, social media posts, or personal contacts to search for donors.

Current systems face several challenges:

* No real-time donor matching
* Outdated donor information
* Slow emergency response
* Lack of intelligent donor recommendation
* Difficulty tracking donor availability

This project aims to solve these problems using AI-based donor matching and emergency prioritization.

---

# Objectives

* Develop a smart blood donation management platform
* Enable real-time donor and patient matching
* Reduce emergency response time
* Implement AI-based donor recommendation
* Predict donor availability
* Improve blood donation management efficiency
* Provide an easy-to-use platform for donors, patients, and hospitals

---

# Key Features

### User Management

* User Registration and Login
* Donor Profile Management
* Patient Profile Management
* Hospital Account Management

### Blood Donation Services

* Blood Donor Registration
* Blood Request Submission
* Donation History Tracking
* Emergency Blood Requests

### AI Features

* AI-Based Donor Matching
* Emergency Request Prioritization
* Donor Availability Prediction
* AI Chatbot Assistant (Gemini API)

### Location Services

* Location-Based Donor Search
* Nearby Donor Recommendations

### Notification System

* Email Notifications
* SMS Alerts (Future Enhancement)

### Admin Dashboard

* Manage Users
* Monitor Blood Requests
* View Reports and Statistics

---

# System Architecture

```text
Frontend (React.js)
↓
Backend API (Node.js / Express.js)
↓
Database (PostgreSQL)
↓
AI Service (Google Gemini API)
```

The frontend (React.js) sends requests to the Backend API (Node.js/Express.js), which handles authentication, business logic, and database operations through PostgreSQL. For AI-related features such as donor matching, prioritization, and chatbot responses, the backend communicates with the Google Gemini API. Location-based features use the Google Maps API as an external service.

---

# Database Design (ER Diagram Summary)

The database includes the following core entities:

* **Users** (donors, patients, hospital admins) — with attributes like user_id (PK), name, email, password, role, contact_number
* **Donor Profile** — donor_id (PK), user_id (FK), blood_group, location, last_donation_date, availability_status
* **Patient Profile** — patient_id (PK), user_id (FK), blood_group_needed, location
* **Hospital** — hospital_id (PK), name, location, contact_info
* **Blood Request** — request_id (PK), patient_id (FK), hospital_id (FK), blood_group, urgency_level, status, created_at
* **Donation History** — donation_id (PK), donor_id (FK), hospital_id (FK), donation_date, blood_group, quantity

Relationships:

* One **User** can have one **Donor Profile** or **Patient Profile**
* One **Donor** can have many **Donation History** records
* One **Hospital** can manage many **Blood Requests**
* One **Patient** can create many **Blood Requests**

Full ER Diagram is available in `docs/ERDiagram.pdf`.

---

# Updated Use Case Diagram

**Actors:**

* Donor
* Patient
* Hospital
* Admin
* AI Engine

**Major Functionalities:**

* Donor registers and updates availability
* Patient submits blood request
* Hospital manages and verifies blood requests
* Admin manages users and monitors system activity
* AI Engine matches donors, prioritizes emergency requests, and powers chatbot assistant

Full Use Case Diagram is available in `docs/UseCaseDiagram.pdf`.

---

# Activity Diagram

**Major Feature: AI-Based Donor Matching Workflow**

```text
Start
↓
Patient/Hospital submits blood request
↓
System validates request details
↓
Decision: Is request valid?
   → No → Show error, return to form
   → Yes → Continue
↓
Backend sends request data to AI Engine (Gemini API)
↓
AI Engine analyzes blood group, location, and donor availability
↓
AI Engine returns ranked list of matching donors
↓
Decision: Are matching donors found?
   → No → Notify hospital/admin for manual search
   → Yes → Continue
↓
System notifies matched donors
↓
Donor accepts/declines request
↓
System updates Blood Request status
↓
End
```

Full Activity Diagram is available in `docs/ActivityDiagram.pdf`.

---

# API Design

### Authentication APIs

**POST /register**
* Purpose: Register a new user (donor, patient, or hospital)
* Input: name, email, password, role, contact_number
* Output: success message, user_id

**POST /login**
* Purpose: Authenticate user and return access token
* Input: email, password
* Output: auth token, user details

**POST /logout**
* Purpose: Log out the current user and invalidate session
* Input: auth token
* Output: success message

### User APIs

**GET /profile**
* Purpose: Retrieve logged-in user's profile information
* Input: auth token
* Output: user profile data

**PUT /profile**
* Purpose: Update logged-in user's profile information
* Input: auth token, updated profile fields
* Output: updated profile data

### Donor & Blood Request APIs

**GET /donors**
* Purpose: Search/list registered donors by blood group and location
* Input: blood_group, location (optional filters)
* Output: list of matching donors

**POST /blood-requests**
* Purpose: Submit a new blood request
* Input: patient_id, blood_group, location, urgency_level
* Output: request_id, status

**PUT /blood-requests/:id**
* Purpose: Update status of a blood request
* Input: request_id, new status
* Output: updated request details

### AI APIs

**POST /chat**
* Purpose: Interact with the AI chatbot assistant
* Input: user message, conversation context
* Output: AI-generated response

**POST /recommendation**
* Purpose: Get AI-based donor recommendations for a blood request
* Input: request_id, blood_group, location
* Output: ranked list of recommended donors

---

# AI Integration Workflow

**Why AI is needed:**
Manual donor searching during emergencies is slow and often fails to find suitable donors in time. AI helps automate and speed up donor matching, prioritize urgent requests, and assist users through a chatbot.

**AI Service/Model Used:** Google Gemini API (with basic Machine Learning logic for availability prediction)

**Workflow:**

```text
Patient/Hospital Request (blood group, location, urgency)
↓
Backend API
↓
Google Gemini API
↓
Ranked Donor Recommendations / AI Response
↓
Frontend Display
```

**Input to AI System:** blood group, location, urgency level, donor availability data, user chat messages

**Output from AI System:** ranked donor recommendations, emergency prioritization scores, predicted donor availability, chatbot responses

**How AI improves the project:**
AI reduces the time required to find compatible donors, automatically prioritizes critical emergency cases, predicts which donors are likely to be available, and provides instant assistance to users through the chatbot — making the overall system faster, smarter, and more reliable.

---

# Technology Stack

## Frontend

* React.js

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## AI Integration

* Google Gemini API
* Basic Machine Learning Logic

## Additional Tools

* Firebase (Optional)
* Google Maps API

## Deployment

* Vercel
* Render

---

# Repository Structure

```text
AI-Blood-Donation-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   ├── Proposal.pdf
│   ├── SRS.pdf
│   ├── SystemDesign.pdf
│   ├── UseCaseDiagram.pdf
│   ├── ERDiagram.pdf
│   ├── ActivityDiagram.pdf
│   ├── APIDesign.pdf
│   └── ArchitectureDiagram.pdf
│
├── diagrams/
│
├── README.md
└── .gitignore
```

---

# Expected Outcome

The system will help patients find blood donors quickly during emergencies. AI-based matching and prioritization will reduce delays and improve response time.

Benefits include:

* Faster donor discovery
* Reduced manual effort
* Improved hospital support
* Better emergency response
* Smarter donor recommendations

---

# Future Enhancements

* Mobile Application (Flutter / React Native)
* Real-Time Chat System
* Hospital Management Module
* Advanced AI Prediction Models
* GPS-Based Emergency Support
* SMS Notification Integration

---

# Real-World Impact

This project addresses a real healthcare problem by helping patients find blood donors more efficiently. By reducing delays and improving donor matching, the system can support hospitals and potentially save lives during emergency situations.

---

# Installation

```bash
# Clone Repository
git clone https://github.com/your-username/AI-Blood-Donation-Management-System.git

# Enter Project Folder
cd AI-Blood-Donation-Management-System

# Install Dependencies
npm install

# Run Application
npm start
```

---
