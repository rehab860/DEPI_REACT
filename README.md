# 🏢 ReeVue — Company & Interview Review Platform

> **Your Experience. Our Community.**
> A community-driven platform where job seekers share real experiences about job interviews and working at companies — so others can make informed decisions before applying.

---

## 👥 Team Members

| Member | Pages |
|--------|-------|
| **Rehab Mohammed** | Review Submission Form · User Profile · Interview Q&A |
| **Noor Karem** | Home Page · Saved Companies · Notifications |
| **Basmala Omar** | Company Profile · Trending |
| **Yasmin Abdelhalim** | Login / Signup · Search Results |

> ⚠️ Abdelrahman Montaser left the team. His pages (Interview Q&A + Notifications) were redistributed to Rehab and Noor.

**Instructor:** Hesham Mohammed

---

## 📌 Project Overview

ReeVue maps real interview and workplace experiences to help job seekers make smarter decisions. Think of it like **Google Reviews — but for companies and job interviews**.

Users can search for a company, read what others said about their interview process, and learn what it's really like working there. They can also leave their own reviews anonymously.

---

## ✅ Features

- **Search & Discovery** — filter companies by name, industry, city, size, rating, and difficulty
- **Review System** — anonymous reviews covering Interview Difficulty, HR Communication, Offer Transparency, Work-Life Balance, and Culture with upvote/downvote
- **Company Profiles** — ratings, interview difficulty, offer rate, salary ranges
- **Interview Q&A** — share and browse real interview questions by role and department
- **Watchlist** — save companies to a personal saved list
- **Notifications** — alerts for activity on saved companies and Q&A replies
- **User Profile** — track submitted reviews, saved companies, and Q&A contributions
- **Trending** — weekly pulse of highest-momentum companies
- **Authentication** — login/logout with session persisted in localStorage

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 (JSX) |
| Routing | React Router DOM v7 |
| Styling | Bootstrap 5 + Bootstrap Icons |
| State Management | React Context API (useReducer) |
| Build Tool | Vite |
| Package Manager | npm |

---

## 📁 Project Structure

```
reevue/
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── context/
    │   ├── AuthContext.jsx          ← Login/logout state, persisted in localStorage
    │   └── CompaniesContext.jsx     ← Search filters state
    ├── routes/
    │   └── AppRouter.jsx            ← All routes + ProtectedRoute guard
    ├── components/
    │   ├── Navbar.jsx               ← Top navigation bar (shared)
    │   ├── Footer.jsx               ← Footer (shared)
    │   ├── ReviewCard.jsx           ← Reusable review card
    │   ├── StarRating.jsx           ← Star rating widget
    │   ├── CompanyDetails.jsx       ← Company info block
    │   ├── Profile.jsx              ← User profile component
    │   ├── SubmitReview.jsx         ← Review form component
    │   └── Login.jsx                ← Login form component
    ├── pages/
    │   ├── Login.jsx                ← Yasmin
    │   ├── Home.jsx                 ← Noor
    │   ├── Trending.jsx             ← Basmala
    │   ├── Search.jsx               ← Yasmin
    │   ├── CompanyProfile.jsx       ← Basmala
    │   ├── SubmitReview.jsx         ← Rehab
    │   ├── UserProfile.jsx          ← Rehab
    │   ├── InterviewQA.jsx          ← Rehab ⭐ (redistributed)
    │   ├── SavedCompanies.jsx       ← Noor
    │   ├── Notifications.jsx        ← Noor ⭐ (redistributed)
    │   └── NotFound.jsx             ← 404 page
    ├── App.jsx                      ← Root app + providers + navbar logic
    ├── App.css
    ├── index.css
    ├── custom.css
    └── main.jsx                     ← Entry point
```

---

## 🔐 Routing

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/trending` | Trending | Public |
| `/search?q=...` | Search Results | Public |
| `/company/:name` | Company Profile | Public |
| `/login` | Login / Signup | Public |
| `/submit-review` | Submit Review | 🔒 Login required |
| `/profile` | User Profile | 🔒 Login required |
| `/saved-companies` | Saved Companies | 🔒 Login required |
| `/notifications` | Notifications | 🔒 Login required |
| `/qa` | Interview Q&A | 🔒 Login required |
| `*` | 404 Not Found | Public |

Protected routes redirect to `/login` if the user is not authenticated.

---

## 🔄 State Management

The app uses **React Context API** with `useReducer` for global state:

- **AuthContext** — manages `user`, `token`, and `isLoggedIn`. Session is persisted in `localStorage` under the key `reevue_auth_v1` so the user stays logged in after page refresh.
- **CompaniesContext** — manages search filter state (`industry`, `city`, `companySize`, `starRating`, `difficulty`) shared between the Search page and Navbar.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

App runs at: **http://localhost:5173**

### Other commands

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

---

## 📚 References & Inspiration

- [Glassdoor](https://glassdoor.com) — market leader in company reviews
- [Blind / TeamBlind](https://teamblind.com) — anonymous professional community
