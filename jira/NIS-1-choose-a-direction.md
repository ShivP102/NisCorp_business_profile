# NIS-1 — Choose a direction

| | |
|---|---|
| Type | Story |
| Status | To do |
| Depends on | None |
| Branch | `nis-1-choose-a-direction` from `main` |
| PRD | `prd/niscorp-company-site.md` |

## User story

As a visitor, I want to see that NisCorp AI builds software and consults, and to open either an individual website or enterprise software, so that I can choose the work I need.

## Intent

The first deployable site is the company, not a framework shell. Home exists so the visitor understands the offer. The two offering pages exist so the home’s primary action goes somewhere real. Phone, email, and WhatsApp work from every page even before the contact form exists.

Aperio is a different site. This story does not name it.

## Entry

- The PRD is the requirements. The app has not been started.
- Real email, WhatsApp number, and domain are still unknown. Use the PRD placeholders: `hello@example.com`, `910000000000`, and `https://example.com`.
- Do not invent a number, address, or founder name.

## Acceptance criteria

- `next build` writes a static `out/` folder. `output: 'export'` is set. Serving `out/` does not need a Node server.
- `data/company.json` has `name`, `email`, `phoneDisplay`, `phoneTel`, `whatsappE164`, `whatsappDefaultText`, and `siteUrl`.
- `data/offerings.json` has two records, `websites` and `enterprise`. Each has `slug`, `title`, `summary`, `metaTitle`, `metaDescription`, and the sections that page renders.
- `lib/data.ts` reads those files at build time and exports typed values. Only server components and metadata functions import it.
- Header and footer appear on `/`, `/websites`, and `/enterprise`. The footer repeats the two examples and phone, email, and WhatsApp. A floating WhatsApp button sits on each of those pages.
- Phone is a `tel:` link and shows the dialable number. Email is a `mailto:` link and shows the address. WhatsApp, including the floating button, is `https://wa.me/<E.164 without plus>?text=...` using `company.json`.
- Home order is hero, short about, the two services, contact. The first viewport shows the company line and both directions as peer choices. The cards use the offering summaries and link to `/websites` and `/enterprise`. A short sequence says: you tell us the work, we propose it, we build it.
- `/websites` is about sites for a person and their practice or private work. A doctor’s practice is an example inside the page. SEO and digital marketing are named as services, without the word “limited”. The page says what the client gets: a site that explains who they are, a clear way for people to reach them, and search and marketing set up around that site. It closes with the three contact actions.
- `/enterprise` describes software that improves how a company runs: understand the operation, build the software around it, and leave the team with a system they use. No product name. It closes with the three contact actions.
- Each of the three pages has one `h1`, a unique title and description from the JSON, and Open Graph title and description. Those tags are in the built HTML.
- Home emits Organization JSON-LD with name, url, email, and telephone. Each offering page emits Service JSON-LD from that offering’s name and description. No Review or AggregateRating.
- The page looks composed: off-white ground, near-black text, one accent on the emphasis and the primary path, WhatsApp green only on the WhatsApp control. On a narrow viewport the header, both cards, and the floating button remain usable, and the button does not cover those actions.
- Copy is specific and calm. No hype, fake proof, partners, subcontractors, or Aperio.

## Exit

- `next build` succeeds and the acceptance criteria are true in `out/`.
- The three routes can be opened from the static files, including the links between them.
- The change can be pushed. It can be deployed as static files.

## Out of this story

- `/contact` and the message form. That is NIS-2.
- `next-sitemap`, `sitemap.xml`, and `robots.txt`. That is NIS-3.
- A backend, a form POST, `[slug]` routes, and anything in the PRD’s “Out of v1” list.
