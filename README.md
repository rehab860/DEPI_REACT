# Reevue

This is a React application built with Vite. It has been recently refactored to be a pure JavaScript project, moving away from TypeScript and Redux Toolkit in favor of a simpler architecture.

## Architecture

- **Framework**: React 19
- **Build Tool**: Vite 8
- **State Management**: React Context API (`AuthContext`, `CompaniesContext`)
- **Routing**: React Router DOM 7
- **Styling**: Bootstrap 5 & custom CSS

## State Management

We use React Context to manage global state:
- `AuthContext`: Manages user login state, persisting sessions in `localStorage` under `reevue_auth_v1`.
- `CompaniesContext`: Manages search filters and company data state.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Refactoring Notes
This project previously used TypeScript and Redux Toolkit. All `.tsx` and `.ts` files have been migrated to `.jsx` and `.js`. The Redux store has been entirely removed, and components have been updated to use the native React Context API (`useContext`) for improved simplicity and reduced bundle size.
