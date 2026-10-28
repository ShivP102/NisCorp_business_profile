# NisCorp AI

Company site for NisCorp AI. Requirements are in `prd/niscorp-company-site.md`. Stories are in `jira/`.

The Next.js app lives at the repository root. `npm run dev` starts it. `npm run build` writes the static export to `out/`.

Each story branch starts from `main`. The agent commits and pushes that branch. You open the pull request and merge it before the next story starts. A commit runs ESLint and Prettier.

```bash
npm install
npm run dev
```
