# ReeVue

A community-driven platform where tech professionals discover, share, and evaluate real interview experiences and workplace insights across top technology companies.

> Built as a graduation project for the **Digital Egypt Pioneers Initiative (DEPI)** · React Track · 2026

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://reevue.vercel.app)

---

## Live Demo

| Resource | Link |
|---|---|
| Deployed App | [Reevue App](https://reevue.vercel.app) |
| GitHub Repo | [Source Code](https://github.com/rehab860/DEPI_REACT) |

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 + Vite 8 |
| Routing | React Router DOM v7 |
| Styling | Bootstrap 5.3 + custom CSS |
| Backend | Firebase v12 (Firestore + Auth) |
| Alerts | SweetAlert2 |
| Deployment | Vercel |

---

## Features

- **Browse & search** company reviews with filter and sort controls
- **5-step review wizard** with draft auto-save, anonymous posting, and edit support
- **Interview Q&A forum** — post questions, filter by department, add answers
- **User dashboard** — personal reviews, saved companies, badges, and settings
- **Dark / light theme** and fully responsive layout
- **Protected routes** — unauthenticated users are redirected to `/login`

---

## Project Structure

```
src/
├── components/      # Navbar, Footer, ReviewCard, StarRating, CompanyDetails
├── context/         # AuthContext · CompaniesContext · ThemeContext
├── firebase/        # config.js — Firebase initialization
├── pages/           # One component per route
├── App.jsx          # Root layout + route definitions
└── custom.css       # Global theme overrides
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with **Email/Password Auth** and **Firestore** enabled

### Installation

```bash
git clone https://github.com/your-org/DEPI_REACT.git
cd DEPI_REACT
npm install
```

### Configure Firebase

Edit `src/firebase/config.js` with your project credentials, or use environment variables:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

### Run

```bash
npm run dev        # Development server → http://localhost:5173
npm run build      # Production build  → /dist
npm run preview    # Preview production build locally
```

---

## Team

| Member | Pages |
|---|---|
| **Rehab Mohammed** | Submit Review · User Profile · Interview Q&A |
| **Noor Karem** | Home · Saved Companies · 404 |
| **Basmala Omar** | Company Profile · Sign Up · Login |
| **Yasmin Abdelhalim** | Firebase setup · AuthContext · Search |

---

*ReeVue — DEPI Graduation Project · React + Vite + Firebase · 2026*
