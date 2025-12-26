# Product Store — React Assignment

This is a small React app built for the assignment. It uses Vite, React, React Router, MUI, Axios and TanStack React Query for data fetching and caching.

Key features implemented:
- Simple login page (username: `user`, password: `password`) with `localStorage` persistence
- Product list (fetches from https://fakestoreapi.com/products) with search, category filter and pagination
- Product detail view with edit (PUT) and delete (DELETE) operations
- React Query used for caching and automatic revalidation on window focus

Setup

Install and run:

```bash
npm install
npm run dev
```

Notes
- After editing a product, the local cache is updated so the list reflects changes immediately without refetching the full list.
- Deleting a product removes it from the local cache and navigates back to the list.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# psiborg
# psiborg
