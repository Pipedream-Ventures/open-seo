# OpenSEO

OpenSEO is an open-source SEO application with hosted and self-hosted deployments. The repository also ships an installable OpenSEO plugin with customer-facing MCP access and SEO workflow skills.

## Repository map

- `src/routes` and `src/router.tsx`: TanStack Start routes
- `src/client`: browser UI and client-side integrations
- `src/serverFunctions`: application entry points for server mutations and queries
- `src/server`: services, repositories, auth, billing, MCP, email, and workflows
- `src/db/d1` and `src/db/pg`: SQLite and Postgres implementations
- `drizzle`: D1 migrations and schema snapshots
- `plugins/openseo`: distributable Codex, Claude, and Cursor plugin
- `specs`: feature and data contracts
- `docs`: development, deployment, self-hosting, privacy, and operator references

## Architecture constraints

- For new application-backed backend behavior, use a TanStack server function, then a service, then a repository.
- Keep schema changes, queries, and mutations compatible with both D1 SQLite and Postgres.
- Validate untrusted values with Zod at trust boundaries.
- Use established TanStack Query, Router, and Form patterns and existing project helpers.
- Keep secrets in environment-specific configuration. Never commit credentials or copy production data into fixtures.

## Product plugin

`plugins/openseo/skills` is the canonical source for the nine SEO workflow skills shipped to customers. These files are product functionality, separate from repository guidance. Keep them as real files beside the plugin manifests and MCP configuration. `pnpm check:plugin-skills` validates the package in place.

## Commands

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm db:migrate:local
pnpm dev
pnpm build
pnpm test
pnpm lint
```

Run the checks relevant to the change; do not add tests that mirror low-impact reversible edits, and broaden or repeat checks only when new behavior or evidence warrants it.
