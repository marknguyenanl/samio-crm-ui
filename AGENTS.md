AGENT GUIDELINES – samio-crm-ui

Build / dev / tooling

- Install deps: `bun install` (or `npm install`).
- Dev server: `bun run dev`.
- Production build: `bun run build`.
- Type-check only: `bun run type-check`.
- Format code: `bun run format` (Prettier on `src/`).
- Tests: no test runner configured; single-test command unavailable.

Code style & organization

- Use Prettier (`.prettierrc.json`): no semicolons, single quotes, width 100.
- Keep TypeScript `strict`-friendly; avoid `any` and prefer explicit types.
- Group imports: Node/external, then `@/` aliases, then relative paths.
- Use Vue 3 `<script setup>` SFCs; keep components small and focused.
- Name Vue components and files in PascalCase (e.g., `ContactTable.vue`).
- Name Pinia stores `useXStore` and colocate related types in `.ts` modules.
- For API calls, use `async/await` with `try/catch`, log via `console.error`, and surface user errors through the `Toast`/`useToast` helpers.
- Prefer descriptive variable names over one-letter identifiers.
- When in doubt, mirror the patterns in existing Dashboard/Contacts components.
