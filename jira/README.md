# NisCorp AI — v1 stories

Source: `prd/niscorp-company-site.md` (version 1.2).

Each story is one visitor outcome. Its branch starts from `main`. Do not break a story into component tasks.

| Order | Story | Branch |
|---|---|---|
| 1 | [NIS-1](NIS-1-choose-a-direction.md) | `nis-1-choose-a-direction` |
| 2 | [NIS-2](NIS-2-reach-the-company.md) | `nis-2-reach-the-company` |
| 3 | [NIS-3](NIS-3-crawlable-release.md) | `nis-3-crawlable-release` |

To run a story, ask for the orchestrator in agent chat and name it (`NIS-1`, `NIS-2`, or `NIS-3`). With no name, it takes the first To do story whose dependencies are already merged into `main`. Composer 2.5 builds on that branch. Grok 4.5 reviews. A passing story is committed and pushed. You open the pull request and merge it. The next story does not start until that merge is on `main`.

Hosting, the real email, the WhatsApp number, and the production domain stay in the PRD section “Still required before publish”. They are not stories in this list.

When a story’s scope changes, edit that file. When the product scope changes, edit the PRD first and add a revision-log line.
