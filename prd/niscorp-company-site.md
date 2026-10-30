# PRD: NisCorp AI company site

|            |                                                                                   |
| ---------- | --------------------------------------------------------------------------------- |
| Status     | Draft. Do not start the app until a coding agent is asked to implement this file. |
| Version    | 1.10                                                                              |
| Updated    | 30 October 2026                                                                   |
| Source     | `plan/niscorp-company-site.md`, then `plan/website-content-enhancement.md`        |
| Supersedes | Those plans, for requirements. The plans stay as the briefs.                      |

This is the requirements document to refer to and update. When a requirement changes, edit the section below and add a line to the revision log. v1 stays inside this file.

The visitor’s job is to recognize that NisCorp AI builds software, practical AI, and consults, choose an offer, and reach the company. The offers are AI and LLM work, websites and SEO, and enterprise software.

## Positioning

NisCorp AI designs and ships modern web apps, enterprise systems, and practical AI (RAG, agents) that a team can keep using. This website is the company. Aperio is a separate product site later. This site does not name Aperio, link to it, or give it a section.

Three offers make the work concrete:

- **AI and LLM.** RAG applications, internal assistants, agentic workflows, evaluation, and handover. This offer has its own page.
- **Websites and SEO.** Sites for a person and their practice or private work. A doctor’s practice is one kind of client, written inside the websites page, not as its own brand. SEO and digital marketing are named as services. The page says what the client gets: a site that explains who they are, a clear way for people to reach them, and search and marketing set up around that site. This offer has its own page.
- **Enterprise software.** Software built for a company to improve how it runs its operations. For this revision it is a section on the services overview, not its own URL. No product name. One unnamed case study may describe a B2B operations platform.

Tone is specific and calm. Name the work and the result. Leave out hype, fake proof, public apologies that shrink the offer, the word “limited” in front of SEO or marketing, partners, subcontractors, and other firms. Do not invent an email, phone number, address, domain, calendar link, or social profile. Home and About speak as **NisCorp AI the company**. Do not use individual names, founder bios, or personal résumé lines on any page. Copy for Home and About lives in `data/company.json` and `data/about.json`. Do not add employer names, client names, or rankings.

## v1 scope

In this revision: Home, a services overview, two service detail pages, About, one case study, Contact, and Privacy. Three contact actions, and a form that opens WhatsApp or email on the visitor’s device after privacy consent.

Out until this PRD moves the item in:

- Aperio, by name or by section
- `/services/enterprise` as its own page
- A product catalog and dynamic `[slug]` offering routes
- CSV ingestion and `papaparse`
- App Router `app/sitemap.ts` and `app/robots.ts`
- Blog, pricing table, testimonials, client logos, counters, newsletter, gated PDFs
- Any server, database, route handler, server action, or third-party form backend
- Review or AggregateRating JSON-LD, and any claim of customers or rankings
- Article, Product, HowTo, or LocalBusiness schema
- Downloading or reskinning a theme
- Keyword clusters, link building, hreflang, and programmatic SEO
- Dark mode
- GA4, until `gaMeasurementId` in `data/company.json` is a real measurement ID
- A calendar button that points at a placeholder URL

Routes stay explicit files. Offering copy stays in JSON. Do not add `app/offerings/[slug]`.

## Information architecture

```mermaid
flowchart TD
  home[Home]
  services[Services overview]
  ai[AI and LLM]
  websites[Websites and SEO]
  about[About]
  cases[Case study]
  contact[Contact]
  home --> services
  home --> ai
  home --> websites
  services --> ai
  services --> websites
  about --> cases
  ai --> contact
  websites --> contact
  services --> contact
  cases --> contact
```

Header and footer on every page. The header is logo (Home), a Services menu, About, and Contact. The menu lists All services, AI and LLM, and Websites and SEO. It is a **relative dropdown** (not inline links): closed by default, toggled from the Services control, dismissed on outside click and Escape. On viewports below `md`, primary links live in a **menu button panel** (hidden until opened); desktop keeps a single-row nav. Case studies stay out of the header. The footer is four columns in one row: the mark and a one-sentence tagline with the copyright under it, the three offers, Company (About and the case study), and Support (Privacy policy and a link to Contact). Phone, email, and WhatsApp stay on the contact actions above the footer, not repeated as plain text under it. Contact actions use a quiet label-and-value layout, not heavy card boxes. WhatsApp green is only the WhatsApp button. A floating WhatsApp button sits on every page.

Home order: hero (company line, H1, subhead, CTAs, company intro, three direction cards), **What we're good at** from `trustFacts`, how a project starts, FAQ, contact. The direction cards are not repeated lower on the page.

## Pages

### Home `/`

- First viewport: the company line (`heroLine`), H1, subhead (`heroSubhead`), discovery-call action, WhatsApp, company intro (`companyIntro`), and the three direction cards.
- Cards use `href` from `data/offerings.json`: AI to `/services/ai-llm`, websites to `/services/websites`, enterprise to `/services#enterprise`.
- **What we're good at:** capability lines from `trustFacts` (stack and delivery themes, not a founder résumé).
- **How a project runs** (`processHeading`): five steps from `processSections` (or `processSteps` labels) in **`ProcessChevronBanner`** (3–5 interlocking chevrons on `md+`; full detail in the mobile list). **`processAssurance`** line under the banner states scope completion and optional ongoing support. Company snippet from `about` with link **About NisCorp AI**.
- FAQ from `data/faqs.json`, with FAQPage JSON-LD.
- Phone, email, and WhatsApp.

Primary action: book a 20-minute discovery call. That links to `/contact` until `calendarUrl` is a real `https` URL.

### Services `/services`

H1 is Services. Intro from `servicesIntro`. Jump links to `#ai-llm`, `#websites`, and `#enterprise`.

AI and websites blocks are teasers with a link to the detail page. Enterprise is the full offer: sections, engagement shapes, a link to the case study, and a discovery-call action. No Service JSON-LD on this URL.

### AI and LLM `/services/ai-llm`

RAG, agents, scopes, stack, and outcomes. Engagement shapes name durations, not fees. Service JSON-LD. The data-protection answer may appear here without a second FAQPage.

Primary action: book a discovery call.

### Websites `/services/websites`

Websites and SEO, with SEO and digital marketing named as services. State what the client gets, as in Positioning. Packages name durations, not fees. Service JSON-LD.

Primary action: book a call to get a site live.

### About `/about`

Company-first copy from `data/about.json`: title **About NisCorp AI**, summary, and sections for what we do, how we work, capabilities, principles, and where we work (remote-first, IST and US coverage at company level). No individual names or founder section. No **Get in touch** body section—contact closes with the shared `ContactActions` block only. No social links until real URLs are in JSON. Link to the case study.

**Layout (lighter bento + one disclosure block):**

- **What we do:** one glass hero cell (wide on large screens).
- **Principles:** accent-left list in a **three-column row** from `sm`—not glass cards, not squeezed beside What we do on `lg`.
- **How we work:** full-width **`ProcessChevronBanner`** on `md+`: three interlocking chevron ribbons left-to-right, liquid-glass fill, accent→maximal gradient on the top edge (stronger on later steps). Ordered **`steps`** in JSON (`title`, `description`); semantic `<ol>`. Below `md`, the same steps stack as bordered rows (no chevron clip).
- **Where we work:** open typography **below** How we work (full width)—not a two-column pair with How we work.
- **Capabilities:** full-width **`DisclosureList`** (same pattern as Home FAQ): `border-y` rows, `details`/`summary`, chevron affordance—**not** a glass card grid. Body text is the detail after the label colon.
- Still **liquid glass** behind the page title. Same six-column grid as other inner pages.

### Case studies `/case-studies`

One unnamed B2B operations platform: context, problem, approach, impact, stack. No screenshot. Close with links to `/services#enterprise` and Contact.

### Contact `/contact`

Phone, email, WhatsApp, and a short form: name, email, path, message. Paths: AI and LLM work, an individual website, enterprise software, or something else. The page says we reply within one business day.

One line says the message opens in WhatsApp or email on the visitor’s device. NisCorp AI processes what the visitor sends; the site does not operate a server-side inbox.

The form includes a required consent checkbox and a link to the Privacy policy. Submit and the email action stay blocked until consent is given.

Primary action: send the message through WhatsApp or email.

### Privacy `/privacy`

Full privacy policy from `data/privacy.json`: last updated date, compliance intro, numbered sections (collection, use, intermediary rules, disclosure, security, user rights, grievance redressal, changes). Grievance contact uses `email` and `phoneDisplay` from `company.json`; registered postal address is available on request via that email until a formal address is added to JSON. Same inner-page shell as About (title glass, readable prose). Linked from the footer Support column and from the contact form.

### Retired routes

`/websites` and `/enterprise` are not pages. `vercel.json` permanently redirects `/websites` to `/services/websites` and `/enterprise` to `/services#enterprise`. A Hostinger upload of `out/` needs the same two rules on that host, because `output: 'export'` does not apply `redirects()` in `next.config.ts`.

## Contact behavior

The site cannot receive a form into an inbox by itself. There is no form backend. All three links come from `data/company.json`.

| Action             | Behavior                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Phone              | `tel:` link. The number is shown as people dial it.                                                                 |
| Email              | Opens the visitor’s email app after privacy consent (dialog or same-tab session). Appends the consent line to the message body. |
| WhatsApp           | Opens WhatsApp after privacy consent (dialog or same-tab session). Appends the consent line to the prefilled text. |
| Floating button    | Same as WhatsApp: consent gate, then default text plus consent line. |
| Form submit        | Does not post. Requires privacy consent (checkbox and native validation). Opens WhatsApp with the visitor’s name, path, message, and consent line. Sets session consent for the tab. |
| Second form action | Same consent rules as form submit. Opens the same text in the visitor’s email app. |

Real phone, email, and `siteUrl` live in `data/company.json`. `calendarUrl` stays empty until it is a real `https` booking link. The discovery-call control uses that URL when it is present, and `/contact` otherwise.

## Visual requirements

The UI is modern and composed. The first viewport shows the company line and the three directions as peer choices. A pale unstyled document or a default template fails.

Ten design languages are in scope. Each has one job so the choice stays readable:

- **Minimalism** carries the company line: large type, a short measure, and whitespace around the choice.
- **Bento grid** is the home structure. The hero spans the grid. The three directions are peer cells. Process, FAQ, and contact fill the rest. Offering pages use the same grid at a smaller density. About uses a **lighter bento**: full-width and half-width glass cells for narrative sections, three peer cells for principles, and a single disclosure block for capabilities—not a uniform card grid.
- **Glassmorphism** is the header and the websites direction card: a translucent fill, a 16px blur, and a 1px light border.
- **Claymorphism** is the enterprise direction card and enterprise section cards on `/services`: a soft radius, inner shadow, and a **muted warm paper** pastel that still clears WCAG 2.2 AA with the text—not a loud terracotta fill.
- The AI direction card is paper fill with a 2px near-black border. AI detail sections on `/services/ai-llm` use a quiet frosted glass surface. They do not use clay or the maximalist hue.
- **Neomorphism** is only the three process tiles. Labels are near-black on a surface close to the page ground.
- **Spatial UI** puts the company line above a liquid shape. Cards lift on hover and on focus.
- **Liquid glass** is one organic shape behind the home hero. Scroll moves it. Inner pages may use a **still, smaller** echo behind the page title (lower opacity, no scroll travel, no morph). `prefers-reduced-motion: reduce` freezes morph and scroll-driven motion.
- **Skeuomorphism** is a light paper grain on the page background.
- **Maximalism** is one display line in the hero: weight, tracking, and a second hue. It does not spread into body copy.
- **Brutalism** is not used on the contact form in this revision. The contact form and shared contact row use the same quiet **glass** family as other softened surfaces: rounded panel, sentence-case labels, and reachable fields.

Other visual rules:

- Off-white paper ground and near-black text. One accent marks emphasis and the primary path. A second hue is allowed only on the maximalist display line.
- WhatsApp green only on the WhatsApp control.
- Tailwind is the styling system. shadcn/ui components are copied into `components/ui` and styled to this system. They are source in this repo, not a downloaded theme.
- Text on glass, clay, and neo surfaces meets WCAG 2.2 AA. Focus stays visible.
- Mobile-first. On a narrow viewport the header, the three direction cards, and the floating button remain usable. The button does not cover those actions.

Leave out dark mode, downloaded or reskinned themes, counters, logo bars, testimonial carousels, pricing tables, and placeholder portfolios.

## SEO requirements

Each page exports a unique title and description from the JSON, plus Open Graph title and description. One `h1` per page, then semantic headings. The static HTML includes the title, description, and JSON-LD in the page source.

JSON-LD:

- Home: Organization with name, url, email, and telephone. `url` is `siteUrl`. FAQPage for the home questions.
- `/services/ai-llm` and `/services/websites`: Service, using that offering’s name and description.
- No Service entity for the enterprise section until it has its own URL.
- No Review or AggregateRating.

Sitemap and robots come from `next-sitemap` after the production build, written into `out/`.

- `next-sitemap.config.js` sets `siteUrl` from `data/company.json`, `generateRobotsTxt: true`, and `outDir: './out'`.
- `package.json` has `"postbuild": "next-sitemap"`.
- `out/sitemap.xml` lists `/`, `/services`, `/services/ai-llm`, `/services/websites`, `/about`, `/case-studies`, `/contact`, and `/privacy`.
- `out/sitemap.xml` does not list `/websites` or `/enterprise`.
- `out/robots.txt` points at that sitemap.

Do not add `app/sitemap.ts` or `app/robots.ts`. Those files would emit a second pair.

## Source control

Each story is committed on its own branch, and every branch starts from `main`. The agent does not open the pull request and does not merge. A human opens the pull request and merges it into `main`. The next story does not start until that merge is on `main`.

Branch names: `nis-1-choose-a-direction`, `nis-2-reach-the-company`, `nis-3-crawlable-release`.

A commit runs ESLint and Prettier through the pre-commit hook. A commit that fails the hook is not done.

## Technical requirements

Static Next.js site. No Node server is required to serve the result. `output: 'export'` is required so the same build can be served by Vercel or uploaded as static files. Pushing JSON or code rebuilds the pages. Nothing runs at request time.

- Next.js App Router, TypeScript, Tailwind CSS.
- Content is JSON, read with Node `fs` at build time in `lib/data.ts`. Import that module only from server components and metadata functions.
- `images.unoptimized: true` when `next/image` is used. Skip the image component until there are real assets.
- The contact form is a client component and receives the company contact fields as props.

### Files

```text
app/
  layout.tsx
  page.tsx
  services/page.tsx
  services/ai-llm/page.tsx
  services/websites/page.tsx
  about/page.tsx
  case-studies/page.tsx
  contact/page.tsx
  contact/ContactForm.tsx
  privacy/page.tsx
  globals.css
components/
  Header.tsx
  SiteNav.tsx
  Footer.tsx
  WhatsAppButton.tsx
  AboutSections.tsx
  PrivacySections.tsx
  PrivacyConsentProvider.tsx
  ProcessChevronBanner.tsx
  DisclosureList.tsx
  DirectionCards.tsx
  ContactActions.tsx
  DiscoveryLink.tsx
  TrustStrip.tsx
  EngagementShapes.tsx
  FaqList.tsx
  OfferingDetail.tsx
  LiquidGlass.tsx
  ui/
data/
  company.json
  offerings.json
  about.json
  faqs.json
  case-studies.json
  privacy.json
lib/
  data.ts
  privacy-consent.ts
public/
next.config.ts
next-sitemap.config.js
vercel.json
```

### `data/company.json`

Fields include `name`, `email`, `phoneDisplay`, `phoneTel`, `whatsappE164`, `whatsappDefaultText`, `siteUrl`, home and contact and services metadata, `heroLine`, `heroSubhead`, `companyIntro`, `about` (short company snippet for the process block on Home), `processHeading`, `processAssurance`, `processSteps` (fallback labels), optional **`processSections`** (`heading` + `paragraphs` for Home process steps), `trustFacts` (capability lines for **What we're good at**), `calendarUrl`, and `gaMeasurementId`. `next-sitemap` reads `siteUrl`. `calendarUrl` and `gaMeasurementId` may be empty.

### `data/about.json`

Fields include `title`, `summary`, `metaTitle`, `metaDescription`, and `sections` (each with `heading` and `paragraphs`). The **How we work** section also has optional ordered **`steps`**: `{ "title", "description" }[]` (three steps). Content is company-first: capabilities, principles, working style, and coverage—no founder or individual names. Expected section headings: What we do, How we work, Capabilities, Principles, Where we work. Do not add a Get in touch section; contact is only `ContactActions` on the page.

### `data/offerings.json`

Three records: `ai-llm`, `websites`, and `enterprise`. Each record has `slug`, `title`, `summary`, `href`, `detail`, `overview`, `overviewCta`, metadata, `sections`, and `shapes`. Home reads `summary` and `href`. Only records with `detail: true` have their own page.

## Hosting

Not part of the first coding task. When the site is deployed:

- Domain and business email stay on Hostinger (`info@` or the address in `company.json`).
- Preferred site host is Vercel, on a plan that allows commercial use. The Hobby plan is for personal projects.
- DNS at Hostinger points the domain at that host.
- The static `out/` folder can instead be uploaded to Hostinger if one bill is preferred. Expect a manual upload or a GitHub Action, and regional rather than global edge caching.

## Still required before publish

- A real `calendarUrl`, if the discovery call should open a scheduler
- Production DNS, when the domain is ready
- The two redirects on any host that does not read `vercel.json`

## Acceptance

Run the production build and open the static output. Walk Home, Services, AI, Websites, About, Case studies, Contact, and Privacy.

- The company reads as software, practical AI, and consulting. Home and About do not name an individual or show a founder bio.
- Aperio does not appear. Neither do PowerSchool or PowerBuddy.
- SEO and digital marketing read as services on the websites page.
- Phone, email, and WhatsApp links use `company.json`. The email is not `hello@example.com`.
- The discovery call goes to Contact while `calendarUrl` is empty.
- The floating button and the form open a prefilled WhatsApp chat. The email action opens a prefilled message. The form does not post. The path list includes AI and LLM work. The contact form requires privacy consent before WhatsApp or email opens. The footer links to Privacy policy.
- View source shows full HTML, a unique title and description per page, Organization and FAQPage on Home, Service on the two detail pages, and no ratings.
- After `next build`, `out/sitemap.xml` lists `/`, `/services`, `/services/ai-llm`, `/services/websites`, `/about`, `/case-studies`, `/contact`, and `/privacy`. It does not list `/websites` or `/enterprise`. `out/robots.txt` references the sitemap.
- The first viewport shows the company line and the three directions. The ten design languages from Visual requirements are each present in their assigned role, and the AI card uses the paper rule. The choice stays obvious.
- A narrow viewport still shows the header, the three direction cards, and the floating button without covering the main actions. The Services menu opens from the keyboard and from a tap, closes on an outside click, and does not block the main actions when dismissed.

## Revision log

| Version | Date            | Change                                                                                                                                          |
| ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0     | 28 October 2026 | Initial PRD, written from `plan/niscorp-company-site.md`.                                                                                       |
| 1.1     | 28 October 2026 | Stories stay on their own branches and are not merged to `main`. Commits run ESLint and Prettier.                                               |
| 1.2     | 28 October 2026 | Every story branch starts from `main`. A human opens the pull request and merges it before the next story starts.                               |
| 1.3     | 28 October 2026 | Visual system is a ten-language blend. Copied shadcn/ui components are in scope. Dark mode and downloaded themes stay out.                      |
| 1.4     | 28 October 2026 | Hybrid services: overview, AI and websites detail pages, enterprise as a section, About, one unnamed case study, FAQPage, and supplied contact. |
| 1.5     | 28 October 2026 | Footer is a four-column row with a small mark. Contact actions share one card; WhatsApp green is only its button.                                |
| 1.6     | 29 October 2026 | Company-first Home and About copy in JSON; **What we're good at** on Home; Services menu with outside dismiss; muted enterprise clay; contact and AI detail use quiet glass; still title glass on inner pages. |
| 1.7     | 29 October 2026 | About layout: bento glass for narrative sections, three principle cells, capabilities in FAQ-style disclosure; remove duplicate Get in touch section. |
| 1.8     | 29 October 2026 | About **How we work**: chevron progression banner (`ProcessChevronBanner`), JSON `steps`; **Where we work** full width below; mobile nav panel (`SiteNav`). Home **How a project starts** uses the same chevron banner for `processSteps`. |
| 1.9     | 30 October 2026 | Privacy route `/privacy` from `data/privacy.json`; footer Support link; contact form privacy consent and link; sitemap includes `/privacy`. |
| 1.10    | 30 October 2026 | Shared `PrivacyConsentProvider`: dialog + session consent for email/WhatsApp on `ContactActions` and floating button; consent line on all outbound messages; form uses native validation. |
