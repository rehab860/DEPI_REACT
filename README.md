# ReeVue — Company Review Platform

> A Glassdoor-style web application where users can discover companies, read and submit workplace reviews, and share interview experiences. Built as a graduation project for the **Digital Egypt Pioneers Initiative (DEPI)**.


## 1. Project Overview

ReeVue is a React single-page application (SPA) that lets job seekers:

- Browse and search company reviews written by real employees
- Submit multi-step reviews with star ratings, pros/cons, and difficulty ratings
- Explore interview Q&A threads for top tech companies
- Manage their personal profile, saved companies, and submitted reviews

The project was developed collaboratively during the DEPI React track, using Firebase as the backend for authentication and real-time data storage, and deployed on Vercel.

---

## 2. Live Demo & Repository

| | Link |
|---|---|
| **Deployed App** | https://reevue.vercel.app |
| **GitHub Repo** | https://github.com/your-org/DEPI_REACT |

---

## 3. Tech Stack

| Category | Technology |
|---|---|
| UI Library | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| Styling | Bootstrap 5.3 + custom CSS |
| Icons | Bootstrap Icons |
| Alerts | SweetAlert2 |
| Backend / Auth | Firebase v12 (Firestore + Authentication) |
| Deployment | Vercel |
| Language | JavaScript (JSX) |

---

## 4. Project Structure

```
src/
├── assets/              # Static images (hero.png, logos)
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ReviewCard.jsx
│   ├── StarRating.jsx
│   ├── CompanyDetails.jsx
│   └── Profile.jsx
├── context/             # Global state via React Context API
│   ├── AuthContext.jsx      ← Auth + Firestore sync
│   ├── CompaniesContext.jsx ← Companies data
│   └── ThemeContext.jsx     ← Light/Dark theme
├── firebase/
│   └── config.js        # Firebase app initialization
├── pages/               # One file per route
│   ├── Home.jsx
│   ├── Reviews.jsx
│   ├── Search.jsx
│   ├── CompanyProfile.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── SubmitReview.jsx     ← [Rehab]
│   ├── UserProfile.jsx      ← [Rehab]
│   ├── InterviewQA.jsx      ← [Rehab]
│   ├── SavedCompanies.jsx
│   └── NotFound.jsx
├── App.jsx              # Root component, routes, layout
├── main.jsx             # React DOM entry point
└── custom.css           # Global custom styles
```

---

## 5. Features

### Authentication
- Email/password sign-up and login via Firebase Authentication
- Persistent login session using localStorage
- Protected routes: unauthenticated users are redirected to `/login`

### Reviews
- Browse all reviews on the Reviews page, ordered by newest first
- Search reviews by company name or keyword
- Submit a new review through a 5-step guided wizard
- Edit or delete your own reviews from the User Profile page
- Anonymous posting option to hide reviewer identity
- Draft auto-save: the wizard saves progress to localStorage so work is not lost

### Interview Q&A
- Browse real interview questions from top companies (Google, Stripe, Meta, Amazon, and more)
- Filter questions by department (Engineering, Product, Design, Operations)
- Post new interview questions with company and department tagging
- Add answers to any existing question
- Accordion-style UI — one question expands at a time

### User Profile
- Personal dashboard with profile card, bio, and avatar initial
- Tabbed panel: My Reviews, Saved Companies, My Q&A, Settings
- Achievement badge system (Contributor, Helpful Peer, Early Adopter)
- Edit display name and bio, saved back to Firebase
- Notification preference toggles (email alerts, push notifications)

### General
- Responsive design — works on mobile, tablet, and desktop
- Dark/light theme via ThemeContext
- SweetAlert2 replaces native `window.alert` for polished notifications
- 404 Not Found page for unknown routes

---

## 6. Pages & Components

### Pages

| Page | Route | Access | Description |
|---|---|---|---|
| Home | `/` | Public | Hero section, featured companies, call-to-action |
| Reviews | `/reviews` | Public | All reviews feed, sortable and filterable |
| Search | `/search?q=` | Public | Search results by company name |
| Company Profile | `/company/:name` | Public | Reviews and details for a specific company |
| Login | `/login` | Public | Email/password login form |
| Sign Up | `/signup` | Public | New account registration |
| Submit Review | `/submit-review` | 🔒 Protected | 5-step review wizard (create or edit) |
| User Profile | `/profile` | 🔒 Protected | Personal dashboard with tabs |
| Interview Q&A | `/qa` | 🔒 Protected | Community interview question forum |
| Saved Companies | `/saved-companies` | 🔒 Protected | Bookmarked companies list |
| Not Found | `*` | Public | 404 fallback page |

### Reusable Components

| Component | Purpose |
|---|---|
| `Navbar` | Top navigation with search bar, active tab highlighting, user menu |
| `Footer` | Site-wide footer |
| `ReviewCard` | Displays a single review with rating, pros/cons, edit/delete actions |
| `StarRating` | Star display in two modes: `interactive` (clickable) and `display` (read-only) |
| `CompanyDetails` | Company header with aggregate rating and review count |

---

## 7. State Management & Context

The app uses React's Context API (no Redux). Three providers wrap the entire application in `App.jsx`:

```
ThemeProvider
  └── AuthProvider
        └── CompaniesProvider
              └── BrowserRouter
                    └── AppContent
```

### AuthContext (`src/context/AuthContext.jsx`)

The most important context in the app. It handles:

**Authentication state**
- Wraps Firebase `onAuthStateChanged` to automatically detect login/logout
- Stores the current user object in state and syncs it to `localStorage` (`reevue_auth_v1`)
- Exports: `auth`, `login`, `logout`, `signup`, `updateProfile`

**Real-time Firestore sync**
- Uses `onSnapshot` to listen to the `reviews` collection in real time
- Converts Firestore timestamps to readable date strings
- Saves the full reviews list to `localStorage` (`reevue_reviews_v1`) on every update

**localStorage delete intercept**
- Overrides `localStorage.setItem` globally
- When `reevue_reviews_v1` is updated with fewer items (a delete), it automatically calls `deleteDoc` on Firestore to keep the database in sync
- This allows pages like UserProfile to delete reviews by only touching localStorage

### CompaniesContext (`src/context/CompaniesContext.jsx`)

Provides company data (name, industry, average rating) to pages that need it, avoiding repeated prop-drilling.

### ThemeContext (`src/context/ThemeContext.jsx`)

Manages light/dark theme state and provides a toggle function.

---

## 8. Firebase Integration

Firebase is initialized in `src/firebase/config.js` and exports two services used throughout the app:

```js
export const auth = getAuth(app);   // Firebase Authentication
export const db = getFirestore(app); // Firestore database
```

### Firestore Collections

| Collection | Document Fields |
|---|---|
| `reviews` | `companyName`, `industry`, `jobTitle`, `city`, `rating`, `difficulty`, `recommend`, `pros`, `cons`, `isAnonymous`, `authorEmail`, `helpfulCount`, `createdAt` |

### Firebase Auth Methods Used

| Method | Used For |
|---|---|
| `createUserWithEmailAndPassword` | Sign-up page |
| `signInWithEmailAndPassword` | Login page |
| `signOut` | Logout button |
| `onAuthStateChanged` | Persistent session detection |
| `updateProfile` | Saving display name after sign-up |

### Firestore Methods Used

| Method | Used For |
|---|---|
| `addDoc` | Submit a new review |
| `updateDoc` | Save edits to an existing review |
| `deleteDoc` | Delete a review (triggered by localStorage intercept) |
| `getDoc` | Load a single review for editing |
| `onSnapshot` | Real-time reviews feed sync |
| `serverTimestamp` | Auto-set `createdAt` on new reviews |

---

## 9. Routing & Navigation

React Router DOM v7 is used. Routes are defined in `App.jsx`.

**Public routes** are accessible to everyone.

**Protected routes** are wrapped in a `ProtectedRoute` component:

```jsx
const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
```

If a logged-out user tries to access `/submit-review`, `/profile`, `/qa`, or `/saved-companies`, they are automatically redirected to `/login`.

The Navbar and Footer are hidden on `/login` and `/signup` for a clean auth experience.

---

## 10. Data Flow

### Submitting a Review

```
User fills wizard → handleSubmit()
  → addDoc(db, 'reviews', reviewData)        [Firestore write]
  → onSnapshot fires in AuthContext          [Real-time listener]
  → localStorage 'reevue_reviews_v1' updated [Sync]
  → navigate('/reviews')                     [Redirect]
```

### Deleting a Review (from UserProfile)

```
handleDeleteReview(id)
  → filter review out of local state
  → localStorage.setItem('reevue_reviews_v1', updatedList)
  → AuthContext localStorage intercept fires
  → deleteDoc(db, 'reviews', id)             [Firestore delete]
```

### Editing a Review

```
handleEditReview(id)
  → navigate('/submit-review', { state: { editingReviewId: id } })
  → SubmitReview useEffect reads editingReviewId
  → getDoc(db, 'reviews', id) → pre-fills form
  → handleSubmit() → updateDoc(db, 'reviews', id)
```

### Interview Q&A (localStorage only)

```
Page load → check localStorage 'reevue_qa_v1'
         → if empty, seed with INITIAL_QA array
User adds question → prepend to qaList → save to localStorage
User adds answer   → map over qaList, append to answers[] → save to localStorage
```

---

## 11. Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/DEPI_REACT.git
cd DEPI_REACT

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output goes to the `dist/` folder and can be deployed to any static hosting provider (Vercel, Netlify, etc.).

### Environment Note

Firebase credentials are currently stored directly in `src/firebase/config.js`. For production deployments it is recommended to move them to a `.env` file:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

And reference them as `import.meta.env.VITE_FIREBASE_API_KEY`.

---

## 12. Team & Ownership

This project was built collaboratively as part of the DEPI React graduation track.

| Member | Responsibilities |
|---|---|
| **Rehab Mohammed** | Submit Review page · User Profile page · Interview Q&A page · Backend integration (Firestore reads/writes for reviews) |
| **Noor Karem** | Home page · Saved Companies page · Not Found (404) page |
| **Basmala Omar** | Company Profile page · Sign Up page · Login page |
| **Yasmin Abdelhalim** | Firebase setup & configuration · AuthContext (authentication + Firestore real-time sync) · Search Results page |

---

*ReeVue — DEPI Graduation Project · React + Vite + Firebase · 2026*
