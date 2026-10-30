# Privacy policy rollout

Implementation plan for the NisCorp AI company site. Living requirements are in `prd/niscorp-company-site.md` (revision 1.9).

## Summary

- **`/privacy`** — Full policy from `data/privacy.json`
- **Footer → Support** — Link to Privacy policy alongside Contact
- **Contact form** — Notice, link to `/privacy`, required consent checkbox before WhatsApp or email

## Surfaces

| Surface | Role |
|---------|------|
| `/privacy` page | Full policy text, stable URL for compliance and grievance references |
| Footer → Support | Persistent discovery on every page |
| Contact form | Short notice + link + consent — not the full policy inline |

## Consent

Required checkbox on the contact form blocks both “Send on WhatsApp” and “Send by email” until checked. Copy references `/privacy` and consent to process details for the inquiry.

## Content source

- Published copy: `data/privacy.json`
- Draft pointer: `privacy_policy.txt` (points at JSON)
- Grievance contact uses `email` and `phoneDisplay` from `data/company.json`

## Verification

- `npm run build` — `out/privacy` and `/privacy` in `out/sitemap.xml`
- Footer link, form consent gating, checkbox label association

## Out of scope

- Terms of service
- Cookie banner (until `gaMeasurementId` is set)
- Server-side consent logging
