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
![Status](https://img.shields.io/badge/Status-AI%20Integration%20In%20Progress-yellow)

</p>

---

# 📖 Table of Contents

* About
* Problem Statement
* Objectives
* Features
* AI Integration
* AI Workflow
* Prompt Engineering
* AI Response Validation
* Error Handling
* Technology Stack
* System Architecture
* Repository Structure
* Database
* REST API
* Authentication
* API Testing
* Installation
* Environment Variables
* Documentation
* Team Members
* Project Status
* Future Improvements
* License

---

# 📌 About

The **AI Blood Donation Management System** is a web-based platform designed to improve the process of finding blood donors during medical emergencies.

The system connects:

* Blood Donors
* Patients
* Hospitals
* Administrators

The main purpose of the system is to reduce the time required to find suitable blood donors.

The application combines a traditional database-driven blood donation management system with an **AI-powered donor recommendation system**.

---

# 🚨 Problem Statement

During emergency situations, patients and hospitals may struggle to find suitable blood donors quickly.

Traditional methods often depend on:

* Phone calls
* Social media posts
* Manual donor searching
* Static donor lists
* Outdated availability information

These approaches can cause delays during critical situations.

Our system addresses this problem by providing centralized donor management and an AI-powered recommendation system that helps rank suitable available donors.

---

# 🎯 Objectives

* Build a centralized blood donation management platform.
* Allow donors to manage their profiles and availability.
* Allow patients and hospitals to create blood requests.
* Identify medically eligible donors using application rules.
* Use AI to rank eligible donors.
* Reduce the time required to find potential donors.
* Provide reliable fallback functionality when the AI service is unavailable.

---

# ✨ Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Password Encryption using bcrypt
* Role-Based Authorization
* Protected Routes

## 🩸 Donor Module

* Donor Registration
* Donor Profile Management
* Blood Group Information
* Availability Management
* Donation History

## 🏥 Patient Module

* Blood Request Creation
* Blood Group Selection
* Emergency Request
* Donor Search
* Request Tracking

## 🏨 Hospital Module

* Hospital Dashboard
* Blood Request Management
* View Available Donors
* Emergency Blood Requests
* Donor Recommendation

## 🤖 AI Module

### AI-Powered Emergency Donor Recommendation

The main AI feature of the system is an intelligent donor recommendation system.

When an emergency blood request is created:

1. The backend retrieves donor information.
2. Application rules identify medically eligible donors.
3. Eligible donor information is sent to Google Gemini.
4. Gemini analyzes the available donor information.
5. AI ranks suitable donors.
6. The backend validates the AI response.
7. Ranked donor recommendations are displayed to the user.

AI considers factors such as:

* Donor availability
* Distance from the emergency location
* Donation history
* Emergency priority
* Other relevant donor information supplied by the backend

> **Important:** Medical blood compatibility is determined using predefined application/database rules. AI is used to rank and recommend already-eligible donors rather than independently making medical compatibility decisions.

---

# 🧠 AI Integration

## Selected AI Service

**Google Gemini API**

The Gemini API is integrated through the backend.

The API key is stored securely in the backend environment variables and is not exposed to the frontend.

---

# 🔄 AI Workflow

```text
Emergency Blood Request
          │
          ▼
     React Frontend
          │
          ▼
     Backend API
          │
          ▼
   PostgreSQL Database
          │
          ▼
Medical Eligibility Check
          │
          ▼
Eligible Donor Data
          │
          ▼
   Prompt Preparation
          │
          ▼
   Google Gemini API
          │
          ▼
   AI Donor Ranking
          │
          ▼
 AI Response Validation
          │
          ▼
   Backend Processing
          │
          ▼
 Recommended Donors
          │
          ▼
     React Frontend
```

---

# 📝 Prompt Engineering

The AI system uses structured prompts to improve the quality and reliability of recommendations.

## System Prompt

```text
You are an intelligent blood donor matching assistant.

Your task is to rank potential blood donors for an emergency blood request.

Use only the donor information supplied by the application.

Do not invent donor information.

Consider donor availability, distance, recent donation history,
and emergency priority.

Return structured recommendations containing the donor ID,
suitability score, and a short reason.
```

## User Prompt

```text
A hospital has created an emergency request for [BLOOD_GROUP]
blood in [LOCATION].

Rank the eligible donors provided below.

Consider:
- Availability
- Distance
- Recent donation history
- Emergency urgency

Return the top recommended donors with:
- Donor ID
- Suitability score
- Short reason

Do not create or modify donor IDs.
```

---

# 📤 Expected AI Output

The AI response is expected to follow a structured format:

```json
{
  "recommendations": [
    {
      "donor_id": "D102",
      "score": 94,
      "reason": "Eligible, available, and located nearby."
    },
    {
      "donor_id": "D115",
      "score": 87,
      "reason": "Eligible and available but farther from the emergency location."
    }
  ]
}
```

The backend validates this response before showing it to users.

---

# ✅ AI Response Validation

The system validates AI-generated responses before displaying them.

Validation includes:

* Checking for empty responses
* Checking whether donor IDs exist
* Checking whether recommended donors are eligible
* Checking the recommendation score format
* Rejecting malformed responses
* Preventing invented donor information
* Handling unexpected AI output

---

# ⚠️ Error Handling

The application is designed to continue working even when the AI service is unavailable.

| Situation              | System Response                        |
| ---------------------- | -------------------------------------- |
| Successful AI response | Display validated recommendations      |
| Empty response         | Show error and use normal donor search |
| API failure            | Use database-based fallback            |
| Network failure        | Display retry option                   |
| Timeout                | Stop request and use fallback          |
| Rate limit             | Inform user and use fallback           |
| Invalid AI response    | Reject response and use fallback       |

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
┌───────────────────────┐
│    React Frontend     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│   Express REST API    │
└───────────┬───────────┘
            │
       ┌────┴────┐
       ▼         ▼
┌────────────┐ ┌──────────────┐
│ PostgreSQL │ │ Gemini API   │
│ Database   │ │ AI Service   │
└────────────┘ └──────────────┘
```

---

# 📂 Repository Structure

```text
AI-Blood-Donation-Management-System/
│
├── Frontend/
│
├── backend/
│
├── database/
│
├── Postman/
│
├── documentation/
│
├── CSE4104-8D-T05_AIWorkflow.pdf
├── CSE4204-8D-T05_AI_Workflow_and_API_Design.pdf
├── CSE4204-8D-T05_ActivityDiagram.pdf
├── CSE4204-8D-T05_ArchitectureDiagram.pdf
├── CSE4204-8D-T05_ERDiagram.pdf
├── CSE4204-8D-T05_UseCaseDiagram.pdf
├── CSE4204-8D-T05_SystemDesign/
├── README.md
└── .gitignore
```

---

# 🗄 Database

The PostgreSQL database manages the core system information.

Main entities include:

* Users
* Donors
* Patients
* Hospitals
* Blood Requests
* Donation History

The database uses:

* Primary Keys
* Foreign Keys
* Relationships
* Constraints
* Data Validation

---

# 🔗 REST API

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |
| POST   | `/api/auth/logout`   |

## User

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/users/profile` |
| PUT    | `/api/users/profile` |

## Donor

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | `/api/donors`     |
| GET    | `/api/donors/:id` |
| PUT    | `/api/donors/:id` |

## Blood Requests

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | `/api/requests`     |
| GET    | `/api/requests`     |
| PUT    | `/api/requests/:id` |

## AI

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/recommendation` |
| POST   | `/api/chat`           |

---

# 🔐 Authentication

The system uses:

* JWT Authentication
* bcrypt Password Hashing
* Protected Routes
* Role-Based Authorization

---

# 🧪 API Testing

API testing is performed using **Postman**.

Testing includes:

* User Registration
* User Login
* Authentication
* CRUD Operations
* Database Connectivity
* API Error Handling
* Protected Routes

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/nusrat968/AI-Blood-Donation-Management-System.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

> Never upload your `.env` file or API keys to GitHub.

---

# 📚 Documentation

Project documentation includes:

* Project Proposal
* SRS
* UI/UX Design
* System Design
* ER Diagram
* Use Case Diagram
* Activity Diagram
* Architecture Diagram
* User Flow
* Backend Progress
* Frontend Documentation
* AI Workflow
* AI Workflow and API Design
* Technology Stack
* Postman API Collection

---

# 👥 Team Members

| Name                     | Student ID  | Responsibility                     |
| ------------------------ | ----------- | ---------------------------------- |
| **Nusrat Jahan Sarna**   | 11220320968 | Team Leader, Documentation, GitHub |
| **Farhana Rahman Adiba** | 11220320976 | API Development & Testing          |
| **Arpita Biswas**        | 11220320978 | Frontend Development               |
| **Nazia Musharrat Neha** | 11220321039 | Backend Development                |

---

# 📈 Project Status

| Module                  | Status          |
| ----------------------- | --------------- |
| UI/UX Design            | ✅ Completed     |
| Frontend Development    | ✅ Completed     |
| Backend Development     | ✅ Completed     |
| PostgreSQL Database     | ✅ Completed     |
| REST APIs               | ✅ Completed     |
| Authentication          | ✅ Completed     |
| API Integration         | ✅ Completed     |
| AI Workflow Design      | ✅ Completed     |
| Prompt Engineering      | ✅ Completed     |
| AI Response Validation  | 🚧 Implementing |
| Gemini API Integration  | 🚧 Implementing |
| AI Donor Recommendation | 🚧 Implementing |
| AI Error Handling       | 🚧 Implementing |
| API Testing             | ✅ Completed     |
| Documentation           | 🚧 Updating     |
| Deployment              | 🚧 In Progress  |

---

# 🎯 Current AI Development Goal

The current development phase focuses on integrating **Google Gemini** into the backend to provide AI-powered emergency donor recommendations.

The AI system will:

1. Receive an emergency blood request.
2. Retrieve eligible donors.
3. Analyze donor information.
4. Rank suitable donors.
5. Return structured recommendations.
6. Validate the AI response.
7. Display the recommendations through the frontend.

---

# 🚀 Future Improvements

* AI-based donor availability prediction
* Improved donor recommendation using historical data
* Real-time donor location
* Smart notification system
* Hospital and blood-bank integration
* Mobile application
* Real-time communication between hospitals and donors
* Advanced analytics dashboard
* Dedicated machine-learning model for donor availability prediction

---







