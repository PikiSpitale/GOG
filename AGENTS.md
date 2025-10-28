# Repository Guidelines

## Project Structure & Module Organization
- `src/` — application code.
  - `src/components/` React components (PascalCase files, e.g., `GamesTable.jsx`).
  - `src/assets/` styles and images (`styles/*.css`, `images/*`).
  - `src/data/` simple data sources (e.g., `games.js`).
- `public/` — static assets served as‑is.
- Top-level: `index.html`, `vite.config.js`, `eslint.config.js`, `package.json`.

Example import: `import GamesTable from './components/GamesTable.jsx'`.

## Build, Test, and Development Commands
- `npm run dev` — start Vite dev server.
- `npm run build` — production build to `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint across the project.

## Coding Style & Naming Conventions
- Language: React + JS/JSX (ES Modules).
- Indentation: 2 spaces; keep lines focused and readable.
- Components: PascalCase (`ProfileBanner.jsx`), hooks `useSomething`.
- Modules/variables: `camelCase`; constants `UPPER_SNAKE_CASE` when global.
- Avoid unused variables; follow ESLint recommendations (`eslint.config.js`).

## Testing Guidelines
- No test runner is configured yet. If adding tests:
  - Use Vitest + React Testing Library.
  - Location: `src/__tests__/Component.test.jsx`.
  - Naming: `*.test.jsx`; keep tests colocated near components when useful.
  - Aim for critical-path coverage (render, interactions, props/state).

## Commit & Pull Request Guidelines
- History is informal; adopt clear, imperative subjects ("Add games table sorting").
- Recommended style (optional): Conventional Commits (`feat:`, `fix:`, `chore:`).
- Branches: `feature/…`, `fix/…`, or `chore/…`.
- PRs must include: purpose, before/after notes or screenshots, test/QA steps, and any follow-ups.

## Security & Configuration Tips
- Do not commit secrets. For runtime config, use Vite env vars prefixed with `VITE_` in `.env` (e.g., `VITE_API_BASE=`) and access via `import.meta.env`.
- Place large static assets in `public/` and reference with `/filename.ext`.
- Keep UI assets optimized; prefer web-friendly formats.
