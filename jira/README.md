# NisCorp AI — v1 stories

Source: `prd/niscorp-company-site.md` (version 1.0).

Each story is one visitor outcome. Do not break a story into component tasks.

To run a story, ask for the orchestrator in agent chat and name it (`NIS-1`, `NIS-2`, or `NIS-3`). With no name, it takes the first To do story whose dependencies are Done. Composer 2.5 builds from the repo rules. Grok 4.5 reviews. A push happens only when you ask for one.

| Order | Story | Outcome |
|---|---|---|
| 1 | [NIS-1](NIS-1-choose-a-direction.md) | A visitor can tell what NisCorp AI does and open either direction. |
| 2 | [NIS-2](NIS-2-reach-the-company.md) | A visitor can send a message through WhatsApp or email on their device. |
| 3 | [NIS-3](NIS-3-crawlable-release.md) | The four routes are in the static build, with sitemap, robots, and the PRD checks. |

Hosting, the real email, the WhatsApp number, and the production domain stay in the PRD section “Still required before publish”. They are not stories in this list.

When a story’s scope changes, edit that file. When the product scope changes, edit the PRD first and add a revision-log line.
