# CLAUDE.md

Guidance for Claude Code sessions working in this repository.

## What this is

`lanc-ai` is the source for the personal blog/portfolio at **https://lanc.ai** —
articles about agentic AI, game development, and software engineering (early
content centers on building video games with Claude Code). It doubles as a
portfolio/CV piece for **Technical Director** roles in game development, so the
design must stay clean, professional, and readable.

It is an **Astro** site styled with **Tailwind CSS v4**, deployed as a **static
site on Cloudflare Pages** (auto-builds from this GitHub repo on every push).

## Key commands

```bash
npm run dev      # dev server at http://localhost:4321
npm run build    # static build into dist/ (what Cloudflare runs)
npm run preview  # serve the production build locally
```

## Adding a new article

Create a Markdown file in **`src/content/articles/`**. The filename (minus
`.md`) becomes the URL slug: `src/content/articles/my-post.md` → `/articles/my-post`.

Frontmatter schema (defined with zod in `src/content.config.ts`):

| Field         | Type     | Required | Behavior                                                      |
| ------------- | -------- | -------- | ------------------------------------------------------------- |
| `title`       | string   | yes      | Article title.                                                |
| `description` | string   | yes      | Used in listings, `<meta>`/OG tags, and the RSS feed.         |
| `pubDate`     | date     | yes      | Sort key — articles are listed by `pubDate` **descending**.   |
| `updatedDate` | date     | no       | Optional; rendered as "Updated …".                            |
| `tags`        | string[] | no       | Defaults to `[]`.                                             |
| `youtube`     | string   | no       | YouTube **video ID** (not a URL) — embeds at the top.         |
| `draft`       | boolean  | no       | Defaults to `false`.                                          |

**Draft behavior:** `draft: true` articles appear in `npm run dev` (for preview)
but are excluded from production builds, RSS, and the sitemap. This filtering
lives in `src/lib/articles.ts` (`getArticles()`) — use that helper anywhere
articles are listed so sorting and draft handling stay consistent.

## YouTube embed convention

Set the `youtube` frontmatter field to a video ID. The article template passes
it to `<YouTube videoId="..." />` (`src/components/YouTube.astro`), which renders
a responsive, privacy-friendly `youtube-nocookie.com` iframe with lazy loading.
No `youtube` field → no embed (the component renders nothing without a `videoId`).

## Conventions

- **Dark theme** by default (set in `src/styles/global.css`).
- **Tailwind utility classes** for styling — no separate per-component CSS files
  unless genuinely necessary. Global tokens/base styles go in `global.css`
  (Tailwind v4 is configured in CSS via `@import 'tailwindcss'` + `@theme`).
- **Article body** uses the `prose` (Typography plugin) classes with a readable
  measure (~65ch) and comfortable line height — don't widen it to full bleed.
- **Code highlighting** is Shiki (built into Astro), `github-dark` theme,
  configured in `astro.config.mjs`. Don't add a separate highlighter.
- Site identity, intro copy, and social links live in `src/consts.ts`.

## Constraints — don't break

- **Output must stay static** (`output: 'static'` in `astro.config.mjs`).
  Cloudflare Pages serves static files; do **not** switch to `output: 'server'`
  or add an SSR adapter.
- **`site: 'https://lanc.ai'`** in `astro.config.mjs` drives canonical URLs, RSS,
  and the sitemap. Don't change it unless the production domain changes.
- Keep **RSS** (`src/pages/rss.xml.js`) and the **sitemap** (`@astrojs/sitemap`)
  working when adding or restructuring pages.
- Cloudflare Pages build settings: build command `npm run build`, output
  directory `dist`.

## Not part of this repo

This is a website. **`.ps1` / `.sh` tooling scripts do not belong here** — that's
the separate ClaudeCodeWSB project. Don't add shell/PowerShell tooling here just
because the author maintains both.
