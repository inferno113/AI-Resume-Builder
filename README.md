# AI Resume Builder

Production-style full-stack AI Resume Builder with a React + Vite frontend and an Express + MongoDB backend.

This repository is organized as a monorepo with two applications:
- `client`: web app for resume creation, editing, preview, sharing, and download.
- `server`: API service for authentication, user profile data, and resume data operations.

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Monorepo Structure (Detailed)](#monorepo-structure-detailed)
- [Application Flow](#application-flow)
- [API Documentation](#api-documentation)
- [Data Models](#data-models)
- [Environment Variables (Secure)](#environment-variables-secure)
- [Getting Started](#getting-started)
- [Run Commands](#run-commands)
- [Security Notes](#security-notes)
- [Roadmap-Ready Extensions](#roadmap-ready-extensions)

## Overview
AI Resume Builder enables users to:
- create and manage multiple resumes,
- edit resume sections in a guided step-by-step builder,
- switch templates and accent colors,
- control resume visibility (private/public),
- preview resumes through public and app-based URLs,
- download printable resume output,
- authenticate via login/register flow backed by JWT.

The backend includes authenticated user endpoints and resume management controller logic. The frontend already provides complete builder UI flow and route structure to support these capabilities.

## Core Features

### 1) Landing Experience
- Marketing homepage with modular sections:
  - Banner
  - Hero
  - Feature highlights
  - Testimonials
  - CTA
  - Footer

### 2) Authentication System
- Register user (name, email, password).
- Login user (email, password).
- JWT issuance with expiration.
- Protected route support via middleware.

### 3) Dashboard Workspace
- Create resume action.
- Upload existing resume action.
- Resume card listing with updated date.
- Edit-title action modal.
- Delete resume action with confirmation.

### 4) Resume Builder (Guided Form Wizard)
- Section-based editing flow with progress indication:
  - Personal Info
  - Professional Summary
  - Experience
  - Education
  - Projects
  - Skills
- Next/Previous section navigation.
- Template selection.
- Accent color customization.
- Resume visibility toggle (public/private).
- Native share action for public resume URL.
- Print/download action.
- Live preview panel.

### 5) Resume Preview and Public View
- Dedicated preview routes:
  - app-scoped preview
  - public preview route
- Graceful "resume not found" fallback state.

### 6) Resume Backend Operations (Controller Layer)
- Create resume
- Delete resume
- Get resume by ID
- Get public resume by ID
- Update resume
- Get all resumes for authenticated user

### 7) Data Model Design
- Nested and structured resume schema:
  - personal info object
  - summary
  - skills array
  - experience array
  - projects array
  - education array
  - template + accent metadata
  - visibility flag

## Tech Stack

### Frontend
- React 19
- Vite 8
- React Router DOM
- Tailwind CSS 4
- Lucide React icons

### Backend
- Node.js (ESM)
- Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- multer
- CORS
- dotenv
- ImageKit SDK dependency present for media pipeline integration

## Monorepo Structure (Detailed)

```text
AI Resume Builder/
├─ client/
│  ├─ .gitignore
│  ├─ eslint.config.js                    # Frontend lint configuration
│  ├─ index.html                          # Vite HTML entry
│  ├─ package.json                        # Frontend scripts and dependencies
│  ├─ package-lock.json
│  ├─ README.md                           # Client-focused README
│  ├─ vite.config.js                      # Vite bundler config
│  ├─ public/
│  │  ├─ favicon.ico
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ logo.svg
│  ├─ dist/                               # Build output
│  │  ├─ index.html
│  │  ├─ favicon.ico
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  ├─ logo.svg
│  │  └─ assets/
│  │     ├─ index-*.css
│  │     ├─ index-*.js
│  │     └─ dummy_profile-*.png
│  └─ src/
│     ├─ main.jsx                         # React app bootstrap
│     ├─ App.jsx                          # Main route definitions
│     ├─ index.css                        # Global styles
│     ├─ assets/
│     │  ├─ assets.js                     # Dummy data source + sample profiles
│     │  ├─ dummy_profile.png
│     │  ├─ favicon.ico
│     │  └─ logo.svg
│     ├─ pages/
│     │  ├─ Home.jsx                      # Landing page composition
│     │  ├─ Login.jsx                     # Login/register UI
│     │  ├─ Layout.jsx                    # App shell + navbar + outlet
│     │  ├─ Dashboard.jsx                 # Resume list and management actions
│     │  ├─ ResumeBuilder.jsx             # Full resume editing workspace
│     │  └─ Preview.jsx                   # Resume preview/public view rendering
│     └─ components/
│        ├─ navbar.jsx                    # Application navbar
│        ├─ Loader.jsx                    # Loading component
│        ├─ ResumePreview.jsx             # Common resume render entry
│        ├─ TemplateSelector.jsx          # Template switch UI
│        ├─ ColorPicker.jsx               # Accent color chooser
│        ├─ PersonalInfoForm.jsx          # Personal details form
│        ├─ ProfessionalSummary.jsx       # Summary editor
│        ├─ ExperienceForm.jsx            # Experience editor
│        ├─ EducationForm.jsx             # Education editor
│        ├─ ProjectForm.jsx               # Project editor
│        ├─ SkillsForm.jsx                # Skills editor
│        ├─ home/
│        │  ├─ Banner.jsx
│        │  ├─ Hero.jsx
│        │  ├─ Features.jsx
│        │  ├─ testimonial.jsx
│        │  ├─ cta.jsx
│        │  ├─ footer.jsx
│        │  └─ Title.jsx
│        └─ templates/
│           ├─ ClassicTemplate.jsx
│           ├─ MinimalTemplate.jsx
│           ├─ MinimalImageTemplate.jsx
│           └─ ModernTemplate.jsx
│
└─ server/
   ├─ .env                                # Local secrets (never commit real values)
   ├─ package.json                        # Backend scripts and dependencies
   ├─ package-lock.json
   ├─ server.js                           # API bootstrapping + middleware + route mount
   ├─ configs/
   │  ├─ db.js                            # MongoDB connection setup
   │  └─ multer.js                        # Upload middleware setup (ImageKit-ready)
   ├─ middlewares/
   │  └─ authMiddleware.js                # JWT auth guard
   ├─ models/
   │  ├─ User.js                          # User schema + password compare method
   │  └─ Resume.js                        # Resume schema (nested sections)
   ├─ controllers/
   │  ├─ userController.js                # Register/login/user profile/user resumes
   │  └─ resumeController.js              # Create/update/delete/get/public-get operations
   └─ routes/
      └─ userRoutes.js                    # User-auth and user-data routes
```

## Application Flow

### Frontend Route Map
- `/` -> Home page
- `/login` -> Login/Register page
- `/app` -> Dashboard (inside layout)
- `/app/builder/:resumeId` -> Resume builder workspace
- `/app/view/:resumeId` -> Preview from app context
- `/view/:resumeId` -> Public preview route

### Backend Route Map
Mounted base path:
- `/api/users`

Active user routes:
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/data` (protected)
- `GET /api/users/resumes` (protected)

Controller-level resume operations implemented for route integration:
- create
- update
- delete
- get by id
- get public by id

## API Documentation

### Auth + User

#### Register User
- Method: `POST`
- Path: `/api/users/register`
- Body:
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "StrongPassword123"
}
```
- Response (success):
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "Your Name",
    "email": "you@example.com"
  },
  "token": "<jwt-token>"
}
```

#### Login User
- Method: `POST`
- Path: `/api/users/login`
- Body:
```json
{
  "email": "you@example.com",
  "password": "StrongPassword123"
}
```
- Response (success):
```json
{
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "Your Name",
    "email": "you@example.com"
  },
  "token": "<jwt-token>"
}
```

#### Get Authenticated User Profile
- Method: `GET`
- Path: `/api/users/data`
- Headers:
```http
Authorization: <jwt-token>
```

#### Get Authenticated User Resumes
- Method: `GET`
- Path: `/api/users/resumes`
- Headers:
```http
Authorization: <jwt-token>
```

### Resume Operations (Implemented in Controller Layer)
The following operations are implemented and ready for route registration:
- Create resume
- Update resume
- Delete resume
- Get resume by id
- Get public resume by id

## Data Models

### User
- `name: String`
- `email: String (unique)`
- `password: String (hashed)`
- timestamps

Method:
- `comparePassword(password)` using bcrypt

### Resume
- `userId: ObjectId -> User`
- `title: String`
- `public: Boolean`
- `template: String`
- `accent_color: String`
- `professional_summary: String`
- `skills: String[]`
- `personal_info` object
- `experience[]`
- `project[]`
- `education[]`
- timestamps

## Environment Variables (Secure)
Create a local environment file in server directory with placeholder values only:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>
JWT_SECRET=<very-strong-random-secret>

# Optional when enabling image upload flow
IMAGEKIT_PUBLIC_KEY=<imagekit-public-key>
IMAGEKIT_PRIVATE_KEY=<imagekit-private-key>
IMAGEKIT_URL_ENDPOINT=<imagekit-url-endpoint>
```

Important:
- Never commit real credentials.
- Rotate any secret immediately if it is exposed.

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB Atlas or local MongoDB

### 1) Install Frontend Dependencies
```bash
cd client
npm install
```

### 2) Install Backend Dependencies
```bash
cd ../server
npm install
```

### 3) Configure Environment
- Add `server/.env` with placeholder-based values from the section above.

### 4) Start Backend
```bash
cd server
npm run server
```

### 5) Start Frontend
```bash
cd client
npm run dev
```

## Run Commands

### Client
- `npm run dev` -> Start Vite dev server
- `npm run build` -> Production build
- `npm run preview` -> Preview production build
- `npm run lint` -> Lint frontend source

### Server
- `npm run server` -> Start backend with nodemon
- `npm start` -> Start backend with node

## Security Notes
- Passwords are hashed with bcrypt before storage.
- Password hashes are not returned in successful auth responses.
- JWT protects authenticated endpoints.
- Keep `.env` secrets private and environment-scoped.
- Do not embed tokens, DB credentials, or private keys in frontend code.

## Roadmap-Ready Extensions
This repository is already structured to support rapid implementation of advanced features:
- Resume routes module wiring for complete REST exposure
- Image upload pipeline with ImageKit integration
- AI-powered content generation and rewriting for summary/experience sections
- PDF export service enhancements
- Role-based admin moderation for public resume pages
- Resume analytics (view/share/download tracking)
- Rate limiting + input validation + audit logs

---

If you want, next I can also add:
1. an `.env.example` file (safe placeholders),
2. a backend route map diagram,
3. API request collections for Postman/Bruno.
