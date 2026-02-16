Gidy Profile Hub
Full-Stack Technical Challenge Submission
1. Executive Summary

The Gidy Profile Hub is a full-stack web application developed to replicate and enhance the Gidy.ai Profile Page experience. The application demonstrates complete end-to-end development capability including database design, RESTful API implementation, frontend architecture, and deployment readiness.

This project was built with a focus on:

Clean and modular architecture

Strong relational database design

Proper REST API structuring

Responsive and modern UI

Feature extensibility

Product thinking through innovation features

The system supports full profile viewing, editing, skill endorsement, theme persistence, and profile picture upload functionality.

2. Project Objectives

The primary objectives of this implementation were:

Recreate a high-fidelity profile interface.

Design a scalable backend system.

Implement a structured relational database schema.

Enable full CRUD operations.

Introduce innovation features to enhance user experience.

Maintain clean, maintainable, and production-ready code.

3. System Architecture Overview

This application follows a layered architecture pattern:

Client Layer → API Layer → Business Logic Layer → Data Access Layer → Database

3.1 Architectural Philosophy

Separation of concerns

Modular backend structure

Reusable frontend components

Clear data ownership per layer

Stateless RESTful communication

4. Technology Stack
4.1 Frontend

React (Vite)

Axios (HTTP client)

CSS (custom styling)

Responsive layout design

Why React?

Component-based architecture

Efficient state management

Fast rendering

Industry-standard frontend library

4.2 Backend

Node.js

Express.js

PostgreSQL

Multer (file uploads)

Why Express?

Lightweight and flexible

Strong middleware ecosystem

Clean routing architecture

4.3 Database

PostgreSQL (Relational Database)

Why PostgreSQL?

Strong relational integrity

Foreign key constraints

Transaction safety

Structured data modeling

Suitable for normalized schema design

5. Database Design

The database schema is normalized and structured to represent relational dependencies clearly.

5.1 Tables

profile

career_vision

experience

education

certification

skills

social_links

5.2 Relationship Structure

One-to-Many Relationships:

One profile → many experiences

One profile → many skills

One profile → many certifications

One profile → many social links

All child tables reference profile via:

profile_id INTEGER REFERENCES profile(id) ON DELETE CASCADE


This ensures:

Referential integrity

Automatic cleanup of dependent data

No orphan records

6. Backend Architecture
6.1 Folder Structure
backend/
│
├── src/
│   ├── controllers/
│   │   └── profileController.js
│   │
│   ├── routes/
│   │   └── profileRoutes.js
│   │
│   ├── db.js
│   ├── multer.js
│   └── server.js
│
├── uploads/
└── package.json

6.2 Responsibilities
server.js

Initializes Express server

Applies middleware

Registers routes

Serves static uploaded images

db.js

Configures PostgreSQL connection pool

Exports database connection

profileRoutes.js

Defines REST endpoints

Connects routes to controller functions

profileController.js

Contains business logic

Performs SQL queries

Handles response formatting

multer.js

Configures file upload storage

Stores images inside uploads directory

Generates unique filenames

7. API Endpoints
7.1 Retrieve Full Profile

GET
/api/profile/full/:id

Returns:

Profile details

Career vision

Experience

Education

Certifications

Skills

Social links

7.2 Update Profile

PUT
/api/profile/:id

Updates:

Name

Role

Location

Bio

Email

Theme

7.3 Upload Profile Picture

POST
/api/profile/upload/:id

Uses Multer middleware

Saves file to uploads directory

Updates profilePic column in database

Returns updated image URL

7.4 Endorse Skill

POST
/api/profile/skills/:id/endorse

Increments endorsement_count

Ensures atomic update

Returns updated skill

8. Frontend Architecture
8.1 Component Structure
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   │   └── ProfilePage.jsx
│   ├── styles/
│   └── main.jsx

8.2 State Management

React useState is used for:

Profile data

Editing states

Theme state

Dynamic rendering

Data fetching is handled using Axios inside useEffect hooks.

9. Innovation Features
9.1 Skill Endorsement System

Users can endorse skills. Each click:

Updates database

Refreshes UI

Displays updated endorsement count

Rationale:

Encourages engagement

Adds social validation

Improves profile credibility

9.2 Theme Persistence (Light / Dark Mode)

Users can toggle between themes.

Theme stored in database

Applied to body class

Persisted on refresh

Rationale:

Modern UX standard

Improves accessibility

Personalizes user experience

9.3 Profile Picture Upload

Implemented using Multer middleware.

Flow:

User selects image

Image uploaded to backend

Stored inside uploads folder

Database updated with file path

Image dynamically rendered

Rationale:

Essential for real profile experience

Demonstrates file handling capability

Shows backend static file serving knowledge

10. Data Flow Explanation

User Action → React State Update → Axios API Call → Express Route → Controller → PostgreSQL → Response → UI Update

This demonstrates full-cycle data consistency across all layers.

11. Error Handling Strategy

Backend:

Try-catch blocks for async operations

Proper HTTP status codes

Structured JSON error responses

Frontend:

Conditional rendering during loading

Defensive null checks

Graceful error fallback

12. Security Considerations

Parameterized SQL queries (Prevents SQL Injection)

Controlled file upload directory

Foreign key constraints

Limited input fields

13. Setup Instructions
Backend
cd backend
npm install
npm run dev


Runs on:

http://localhost:5000

Database

Create database:

CREATE DATABASE profiledb;


Execute provided SQL schema.

Insert initial seed data.

Frontend
cd frontend
npm install
npm run dev


Runs on:

http://localhost:5173

14. Deployment Plan

Frontend:

Vercel or Netlify

Backend:

Render or Railway

Database:

Hosted PostgreSQL

Environment variables configured via hosting dashboards.

15. Evaluation Criteria Mapping
Criteria	Implementation
Code Quality	Modular architecture, clean folder structure
System Design	Normalized relational schema, MVC backend
UI/UX	Responsive design, theme toggle
Innovation	Skill endorsement, profile image upload
16. Scalability Considerations

Database supports multiple profiles

Easy to add authentication layer

Ready for pagination on experience and skills

Modular backend ready for microservice extraction

17. Conclusion

This project demonstrates:

Full-stack engineering capability

Clean backend architecture

Structured relational data modeling

RESTful API design

Interactive frontend behavior

Innovation thinking

The implementation meets all core requirements and extends functionality through thoughtful feature additions.

Author

Booshan R
Computer Science Engineering Graduate
Passionate about Full Stack Development