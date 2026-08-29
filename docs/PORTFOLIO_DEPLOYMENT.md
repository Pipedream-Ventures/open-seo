# Portfolio deployment

This fork runs one private OpenSEO workspace for the Pipedream Ventures product portfolio. Each product website is a separate OpenSEO project. Product domains, keywords, Google grants, and query data stay in the deployment and do not belong in Git.

## Ownership

- GitHub: `Pipedream-Ventures/open-seo`
- Upstream: `every-app/open-seo`
- Cloudflare account: `Pipedream Ventures`
- Worker: `https://open-seo-selfhost.rapchat.workers.dev`
- Infisical: project `a44cf856-7504-4b5d-8562-b2a033cbd61c`, environment `prod`, path `/open-seo`

Cloudflare Access restricts the app to Seth's Pipedream Ventures, Rapchat, and Ratio Labs email addresses. The deployment uses D1, R2, KV, Durable Objects, and Cloudflare Workflows provisioned by the upstream Alchemy stack.

## Deploy

Log in to Cloudflare and Infisical on the machine, then run:

```sh
pnpm deploy:portfolio
```

The command exports only `/open-seo` from Infisical into the ignored `.env.selfhost` file, deploys the `selfhost` stage, and removes the local secret file when the command exits.

Before a production query, validate the DataForSEO credential with the free `GET /v3/appendix/user_data` endpoint. Do not assume a successful Cloudflare deployment proves the provider credential works.

## Update from upstream

```sh
git fetch upstream
git merge upstream/main
pnpm install --frozen-lockfile
pnpm build
pnpm deploy:portfolio
```

Resolve upstream conflicts without dropping the portfolio deployment script or Infisical routing.
