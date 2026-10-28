# NIS-2 — Reach the company

| | |
|---|---|
| Type | Story |
| Status | To do |
| Depends on | NIS-1 |
| Branch | `nis-2-reach-the-company` from `main` |
| PRD | `prd/niscorp-company-site.md` |

## User story

As a visitor, I want to send my name, the kind of work I need, and a message through WhatsApp or email on my own device, so that I can reach NisCorp without the site storing the message.

## Intent

The site has no inbox of its own. The contact page makes that obvious and still gives the visitor a way to write. Submit opens WhatsApp with the message filled in. A second action opens the same text in the visitor’s email app. Nothing is posted to a server.

The three links already work from NIS-1. This story adds the page where a visitor composes the message, and makes Contact reachable from the header and footer.

## Entry

- NIS-1 is merged into `main`. `/`, `/websites`, and `/enterprise` are on `main` and build to static HTML.
- `data/company.json` already holds the contact fields, including the placeholders until real values exist.
- No route handler, server action, or form service has been added.

## Acceptance criteria

- `/contact` shows phone, email, and WhatsApp from `data/company.json`, using the same `tel:`, `mailto:`, and `wa.me` behavior as the other pages.
- The page has a form with name, email, path, and message. The path choices are an individual website, enterprise software, or something else.
- One line on the page says the message opens in WhatsApp or email on the visitor’s device.
- Submit does not post. It opens WhatsApp with the visitor’s name, path, and message filled in.
- A second action opens that same text in the email app.
- The form is a client component. It receives the company contact fields as props. It does not import `lib/data.ts`.
- Header and footer link to `/contact`. The floating WhatsApp button is on this page and still uses `whatsappDefaultText`.
- The page has one `h1`, a unique title and description, and Open Graph title and description, present in the built HTML.
- The contact page uses the same visual system as the rest of the site. On a narrow viewport the form actions and the floating button do not cover each other.
- Filling the form and submitting does not send a network request to this site.

## Exit

- `next build` succeeds and `/contact` is in `out/`.
- The WhatsApp and email actions open a prefilled message. Confirmed by inspecting the link, not by sending a real message.
- The change can be pushed. It can be deployed as static files.

## Out of this story

- Sitemap and robots. NIS-3 adds `/contact` to the sitemap once this route exists.
- Receiving the message in a NisCorp inbox. That requires a backend, which is out of v1.
- Replacing the placeholders with a real email or WhatsApp number. Those stay in “Still required before publish”.
