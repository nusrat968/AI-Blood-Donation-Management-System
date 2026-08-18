🩸 AI Blood Donation Management System
<p align="center"> An AI-powered web application that connects <strong>blood donors</strong>, <strong>patients</strong>, and <strong>hospitals</strong> to make blood donation faster, smarter, and more efficient during emergencies. </p> <p align="center">












</p>
📖 Table of Contents
About
Problem Statement
Objectives
Features
Current Week Progress
AI Integration
AI Workflow
Prompt Engineering
AI Response Validation
Error Handling
Technology Stack
System Architecture
Repository Structure
Database
REST API
Authentication
API Testing
Installation
Environment Variables
Documentation
Team Members
Project Status
Current Development Focus
Future Improvements
License
📌 About

The AI Blood Donation Management System is a web-based platform designed to improve the process of finding blood donors during medical emergencies.

The system connects:

Blood Donors
Patients
Hospitals
Administrators

The main purpose of the system is to reduce the time required to find suitable blood donors.

The platform combines a database-driven blood donation system with role-based workflows, donor response management, notifications, and an AI-powered donor recommendation system.

🚨 Problem Statement

During emergency situations, patients and hospitals may struggle to find suitable blood donors quickly.

Traditional methods often depend on:

Phone calls
Social media posts
Manual donor searching
Static donor lists
Outdated availability information

These approaches can cause delays during critical situations.

Our system provides centralized donor management, blood request management, donor responses, notifications, and an AI-powered recommendation system to make the process more organized and efficient.

🎯 Objectives
Build a centralized blood donation management platform.
Allow donors to manage their profiles and availability.
Allow patients and hospitals to create blood requests.
Provide separate workflows for donors, patients, and hospitals.
Allow matching donors to respond directly to blood requests.
Notify suitable donors when a new blood request is created.
Notify requesters when a donor responds.
Identify medically eligible donors using application rules.
Use AI to rank eligible donors.
Reduce the time required to find potential donors.
Provide reliable fallback functionality when the AI service is unavailable.
✨ Features
🔐 Authentication
User Registration
Secure Login
JWT Authentication
Password Encryption using bcrypt
Role-Based Authorization
Protected Routes
Donor / Patient / Hospital account types
🩸 Donor Module
Donor Registration
Donor Profile Management
Blood Group Information
Availability Management
Last Donation Date
Donation History
View Matching Blood Requests
Respond to Blood Requests
"I Can Help" donor response workflow
🧑‍⚕️ Patient Module
Blood Request Creation
Blood Group Selection
Emergency Request
Donor Search
Request Tracking
Receive donor response notifications
🏨 Hospital Module
Hospital Dashboard
Blood Request Management
View Available Donors
Emergency Blood Requests
Donor Recommendation
🔔 Notification System

The application includes an in-app notification system.

Current workflow:

When a new blood request is created, matching donors can receive a notification.
When a donor responds to a blood request, the requester receives a notification.
Users can view recent notifications.
Unread notification count is displayed in the navbar.
Users can mark individual notifications as read.
Users can mark all notifications as read.
🤖 AI Module
AI-Powered Emergency Donor Recommendation

The main AI feature of the system is an intelligent donor recommendation system.

When an emergency blood request is created:

The backend retrieves donor information.
Application rules identify medically eligible donors.
Eligible donor information is prepared for the AI service.
Google Gemini analyzes the available donor information.
AI ranks suitable donors.
The backend validates the AI response.
Ranked donor recommendations are displayed to the user.

AI may consider:

Donor availability
Distance from the emergency location
Donation history
Emergency priority
Other relevant donor information supplied by the backend

Important: Medical blood compatibility is determined using predefined application/database rules. AI is used to rank and recommend already-eligible donors rather than independently making medical compatibility decisions.

📈 Current Week Progress

This week's development focused on making the application role-aware and connecting the blood request workflow with donor responses and notifications.

Database
Added user_type to the users table.
Added role validation for donor, patient, and hospital.
Connected last_donation_date with the donor profile workflow.
Integrated the existing donor_responses table.
Integrated the existing notifications table.
Backend
Fixed registration so the selected user role is saved correctly.
Updated login response to return user role and last donation date.
Updated /api/users/me profile endpoints.
Added donor-specific blood request endpoint.
Added donor response endpoint.
Fixed route ordering for /for-donor.
Added notification controller and routes.
Frontend
Added role-based Home and Sidebar content.
Donors now see blood requests instead of donor-search content.
Patients and hospitals retain the blood request submission workflow.
Added donor last donation date during registration.
Added editable donor last donation date in Profile.
Added notification bell and unread notification count.
Added notification dropdown and mark-as-read functionality.
Removed duplicate navbar navigation links.
Fixed the View All Donors initial loading issue.
Testing
Tested donor and patient role-based rendering.
Tested patient request → donor response workflow.
Tested donor profile editing.
Tested API route matching and fixed the /for-donor route issue.
Tested database and authentication integration.
🧠 AI Integration
Selected AI Service

Google Gemini API

The Gemini API is integrated through the backend.

The API key is stored securely in backend environment variables and is not exposed to the frontend.

The AI donor recommendation feature is currently under implementation and will be connected to the completed role-aware blood request and donor response workflow.

🔄 AI Workflow
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
📝 Prompt Engineering
System Prompt
You are an intelligent blood donor matching assistant.


Your task is to rank potential blood donors for an emergency blood request.


Use only the donor information supplied by the application.


Do not invent donor information.


Consider donor availability, distance, recent donation history,
and emergency priority.


Return structured recommendations containing the donor ID,
suitability score, and a short reason.
User Prompt
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
📤 Expected AI Output
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

The backend will validate this response before displaying it to users.

✅ AI Response Validation

Validation includes:

Checking for empty responses
Checking whether donor IDs exist
Checking whether recommended donors are eligible
Checking the recommendation score format
Rejecting malformed responses
Preventing invented donor information
Handling unexpected AI output
⚠️ Error Handling

The application is designed to continue working even when the AI service is unavailable.

Situation	System Response
Successful AI response	Display validated recommendations
Empty response	Show error and use normal donor search
API failure	Use database-based fallback
Network failure	Display retry option
Timeout	Stop request and use fallback
Rate limit	Inform user and use fallback
Invalid AI response	Reject response and use fallback
🛠 Technology Stack
Layer	Technology
Frontend	React.js
Backend	Node.js + Express.js
Database	PostgreSQL
Authentication	JWT + bcrypt
AI	Google Gemini API
Maps	Google Maps API
Notifications	Firebase / In-app Notifications
API Testing	Postman
Version Control	Git & GitHub
🏗 System Architecture
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
📂 Repository Structure
AI-Blood-Donation-Management-System/
│
├── Frontend/
├── backend/
├── database/
├── Postman/
├── documentation/
├── screenshots/
├── ai/
├── README.md
└── .gitignore
🗄 Database

The PostgreSQL database manages the core system information.

Main entities include:

Users
Donors
Patients
Hospitals
Blood Requests
Donation History
Donor Responses
Notifications

The database uses:

Primary Keys
Foreign Keys
Relationships
Constraints
Data Validation
🔗 REST API
Authentication
Method	Endpoint
POST	/api/auth/register
POST	/api/auth/login
POST	/api/auth/logout
User
Method	Endpoint
GET	/api/users/me
PATCH	/api/users/me
Donor
Method	Endpoint
GET	/api/donors
GET	/api/donors/:id
PUT	/api/donors/:id
GET	/api/blood-requests/for-donor
POST	/api/blood-requests/:id/respond
Blood Requests
Method	Endpoint
POST	/api/blood-requests
GET	/api/blood-requests
PUT	/api/blood-requests/:id
Notifications
Method	Endpoint	Purpose
GET	/api/notifications	Get user notifications
PATCH	/api/notifications/:id/read	Mark notification as read
PATCH	/api/notifications/read-all	Mark all notifications as read
AI
Method	Endpoint
POST	/api/recommendation
POST	/api/chat

Endpoint names should be kept synchronized with the actual backend implementation.

🔐 Authentication

The system uses:

JWT Authentication
bcrypt Password Hashing
Protected Routes
Role-Based Authorization
Donor / Patient / Hospital account types
🧪 API Testing

API testing is performed using Postman.

Testing includes:

User Registration
User Login
Authentication
Role-based access
CRUD Operations
Blood Request Workflow
Donor Response Workflow
Notification APIs
Database Connectivity
API Error Handling
Protected Routes
🚀 Installation
Clone Repository
git clone https://github.com/nusrat968/AI-Blood-Donation-Management-System.git
cd AI-Blood-Donation-Management-System
Backend
cd backend
npm install
npm run dev
Frontend
cd Frontend
npm install
npm run dev
⚙️ Environment Variables

Create a .env file inside the backend directory.

PORT=5000


DATABASE_URL=your_postgresql_connection_string


JWT_SECRET=your_secret_key


GEMINI_API_KEY=your_gemini_api_key

Never upload your .env file or API keys to GitHub.

📚 Documentation

Project documentation includes:

Project Proposal
SRS
UI/UX Design
System Design
ER Diagram
Use Case Diagram
Activity Diagram
Architecture Diagram
User Flow
Backend Progress
Frontend Documentation
AI Workflow
AI Workflow and API Design
Technology Stack
Postman API Collection
Weekly Progress Reports
👥 Team Members
Name	Student ID	Responsibility
Nusrat Jahan Sarna	11220320968	Team Leader, Documentation, GitHub
Farhana Rahman Adiba	11220320976	API Development & Testing
Arpita Biswas	11220320978	Frontend Development
Nazia Musharrat Neha	11220321039	Backend Development
📈 Project Status
Module	Status
UI/UX Design	✅ Completed
Frontend Development	✅ Completed
Backend Development	✅ Completed
PostgreSQL Database	✅ Completed
REST APIs	✅ Completed
Authentication	✅ Completed
Role-Based Access Control	✅ Completed
Blood Request Workflow	✅ Completed
Donor Response Workflow	✅ Completed
Notification System	🚧 In Progress
API Integration	✅ Completed
AI Workflow Design	✅ Completed
Prompt Engineering	✅ Completed
AI Response Validation	🚧 Implementing
Gemini API Integration	🚧 Implementing
AI Donor Recommendation	🚧 Implementing
AI Error Handling	🚧 Implementing
API Testing	✅ Completed
Documentation	🚧 Updating
Deployment	🚧 In Progress
🎯 Current AI Development Goal

The current development phase focuses on integrating Google Gemini into the backend to provide AI-powered emergency donor recommendations.

The AI system will:

Receive an emergency blood request.
Retrieve eligible donors.
Analyze donor information.
Rank suitable donors.
Return structured recommendations.
Validate the AI response.
Display the recommendations through the frontend.

The AI feature will be connected to the already-developed role-aware blood request and donor response workflow.

🚀 Future Improvements
AI-based donor availability prediction
Improved donor recommendation using historical data
Real-time donor location
Smart notification system
Hospital and blood-bank integration
Mobile application
Real-time communication between hospitals and donors
Advanced analytics dashboard
Dedicated machine-learning model for donor availability prediction

