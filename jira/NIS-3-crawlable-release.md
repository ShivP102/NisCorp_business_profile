# NIS-3 — Crawlable release

| | |
|---|---|
| Type | Story |
| Status | Ready for PR |
| Depends on | NIS-1, NIS-2 |
| Branch | `nis-3-crawlable-release` from `main` |
| PRD | `prd/niscorp-company-site.md` |

## User story

As a visitor arriving from search, I want the four pages to be real HTML with their own titles, so that the page I open is the one that matches the result.

## Intent

NIS-1 and NIS-2 already put unique titles, descriptions, and JSON-LD on the pages. This story makes the built site enumerable and checks the whole PRD against `out/`. Sitemap and robots come from `next-sitemap` after the build. App Router sitemap or robots files would emit a second pair, so they stay absent.

This is the last coding story before publish. It does not choose a host or invent the real contact details.

## Entry

- NIS-1 and NIS-2 are merged into `main`.
- `out/` contains `/`, `/websites`, `/enterprise`, and `/contact` after `next build`.
- `siteUrl` in `data/company.json` is still the placeholder unless a real domain has been supplied.

## Acceptance criteria

- `next-sitemap` is a dependency. `next-sitemap.config.js` reads `siteUrl` from `data/company.json`, sets `generateRobotsTxt: true`, and sets `outDir: './out'`.
- `package.json` runs `"postbuild": "next-sitemap"`.
- After `next build`, `out/sitemap.xml` lists `/`, `/websites`, `/enterprise`, and `/contact`. `out/robots.txt` points at that sitemap.
- `app/sitemap.ts` and `app/robots.ts` do not exist.
- View source of each built page shows full HTML, one `h1`, and a unique title and description. Home shows Organization JSON-LD. Each offering page shows Service JSON-LD. No page shows Review or AggregateRating, or a claim of customers, years, or rankings.
- A walk of the four pages matches the PRD acceptance list: the company reads as software solutions and consulting, Aperio does not appear, SEO and digital marketing are services on the websites page, contact links use `company.json`, the floating button and the form open a prefilled WhatsApp chat, and the email action opens a prefilled message.
- The first viewport on home shows the company line and the two directions. A narrow viewport still shows the header, the two example cards, and the floating button without covering the main actions.

## Exit

- `next build` succeeds, and the sitemap and robots files are in `out/`.
- Every acceptance check above has been confirmed on the static output.
- The change can be pushed. The `out/` folder can be deployed as static files.
- Publish to the production domain still waits on the contact email, the WhatsApp number with country code, and the domain.

## Out of this story

- Vercel project setup, Hostinger DNS, and a GitHub Action upload. Hosting is described in the PRD and is not this story.
- Search Console, link building, hreflang, and extra schema types. They are out of v1.
