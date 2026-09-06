# OpenSEO

OpenSEO is an open-source alternative to Semrush and Ahrefs for keyword research, rank tracking, competitor analysis, backlinks, site audits, and AI visibility. It supports the hosted service at [openseo.so](https://openseo.so) and self-hosted deployments using a customer-owned DataForSEO account.

## Repository map

| Path                  | Purpose                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `src/routes`          | TanStack Start routes and API endpoints                          |
| `src/client`          | UI, feature modules, navigation, and browser integrations        |
| `src/serverFunctions` | Typed server entry points                                        |
| `src/server`          | Services, repositories, auth, billing, MCP, email, and workflows |
| `src/db/d1`           | Cloudflare D1 implementation                                     |
| `src/db/pg`           | Postgres implementation                                          |
| `drizzle`             | D1 migrations and schema snapshots                               |
| `plugins/openseo`     | Distributable Codex, Claude, and Cursor plugin                   |
| `specs`               | Feature and architecture contracts                               |
| `docs`                | Local development, deployment, self-hosting, and operator guides |

## Local development

Requires Node.js 20+, Corepack, and the pnpm version declared in `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm db:migrate:local
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm check:plugin-skills
```

Copy `.env.example` to `.env.local` and follow [Local Development](docs/LOCAL_DEVELOPMENT.md) for DataForSEO and auth-mode setup.

## Architecture

OpenSEO runs on TanStack Start and Cloudflare Workers. Application-backed operations flow from a TanStack server function to a service and repository. D1 is the default database; Postgres is supported for larger installations. Both backends share compatible schemas and behavior. Zod validates untrusted values at trust boundaries.

Auth modes support Cloudflare Access, local trusted development, and hosted Better Auth. DataForSEO credentials and deployment secrets belong in the documented environment files or deployment secret store.

## MCP and product skills

`plugins/openseo` contains the plugin manifests, hosted MCP configuration, and nine SEO workflow skills distributed to customers. The files under `plugins/openseo/skills` are product functionality and remain the canonical skill source for packaging. See [plugin documentation](plugins/openseo/README.md), [MCP setup](https://openseo.so/docs/mcp), and [skill setup](https://openseo.so/docs/skills/setup).

## Deployment and contribution

- [Docker self-hosting](docs/SELF_HOSTING_DOCKER.md)
- [Cloudflare self-hosting](docs/SELF_HOSTING_CLOUDFLARE.md)
- [Portfolio deployment](docs/PORTFOLIO_DEPLOYMENT.md)
- [Contributing](docs/CONTRIBUTING.md)
- [DataForSEO setup](docs/DATAFORSEO_API_KEY.md)

OpenSEO is licensed under the [MIT License](LICENSE). Pricing and hosted-service details live at [openseo.so/pricing](https://openseo.so/pricing).
