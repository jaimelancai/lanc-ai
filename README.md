# lanc.ai

Personal blog & portfolio site for **[lanc.ai](https://lanc.ai)** — articles on
agentic AI, game development, and software engineering, with a focus on building
video games using Claude Code. Built with [Astro](https://astro.build) and
[Tailwind CSS](https://tailwindcss.com), deployed as a static site on
**Cloudflare Pages**.

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the static site into dist/
npm run preview  # preview the production build locally
```

Requires Node.js 18.20.8+ / 20.3.0+ / 22+ (this project is developed on Node 24).

## Adding a new article

1. Create a Markdown file in `src/content/articles/`, e.g.
   `src/content/articles/my-new-post.md`. The **filename becomes the URL slug**
   (`/articles/my-new-post`).
2. Add frontmatter:

   ```yaml
   ---
   title: 'My New Post'              # required
   description: 'A one-line summary.' # required — used in listings, SEO & RSS
   pubDate: 2026-06-14               # required — sorts listings (most recent first)
   updatedDate: 2026-06-20           # optional — shown as "Updated …"
   tags: ['claude-code', 'game-dev'] # optional — defaults to []
   youtube: 'dQw4w9WgXcQ'            # optional — YouTube video ID for a top embed
   draft: false                      # optional — drafts are hidden in production
   ---
   ```

3. Write the body in Markdown below the frontmatter. Code blocks get syntax
   highlighting automatically (Shiki, `github-dark` theme).

### Frontmatter fields

| Field         | Type       | Required | Notes                                                   |
| ------------- | ---------- | -------- | ------------------------------------------------------- |
| `title`       | string     | ✅       | Article title.                                          |
| `description` | string     | ✅       | Summary used in listings, `<meta>` tags, and RSS.       |
| `pubDate`     | date       | ✅       | Publish date. Everything is sorted by this, descending. |
| `updatedDate` | date       | —        | Optional "last updated" date.                           |
| `tags`        | string[]   | —        | Defaults to `[]`.                                       |
| `youtube`     | string     | —        | A YouTube **video ID** (not a URL). Embeds at the top.  |
| `draft`       | boolean    | —        | Defaults to `false`. `true` hides it from production.   |

> **Drafts:** articles with `draft: true` are visible in `npm run dev` so you
> can preview them, but excluded from the production build (`npm run build`),
> the RSS feed, and the sitemap.

### YouTube embeds

Add a `youtube` frontmatter field with the video ID and the article page renders
a responsive, privacy-friendly embed (via `youtube-nocookie.com`) above the body.
Omit the field for no video. The embed is also reusable in any `.astro` file:

```astro
---
import YouTube from '../components/YouTube.astro';
---
<YouTube videoId="dQw4w9WgXcQ" />
```

## Replacing the avatar

`public/avatar.png` is an auto-generated placeholder. **Replace it** with your
own square image (256×256 or larger works well) — keep the same path/filename,
or update `AVATAR_SRC` in `src/consts.ts`. It is displayed cropped to a circle on
the homepage and used as the default social-card image.

Site identity, the homepage intro copy, and the footer/social links also live in
`src/consts.ts` — update the GitHub / YouTube / LinkedIn placeholder URLs there.

## Cloudflare Pages settings

This repo auto-builds on every push. In the Cloudflare Pages project:

| Setting              | Value           |
| -------------------- | --------------- |
| **Framework preset** | Astro           |
| **Build command**    | `npm run build` |
| **Output directory** | `dist`          |
| **Node version**     | `22` (or newer) — set `NODE_VERSION=22` in the project's environment variables if the default is older |

The build produces a fully static site in `dist/`. The `site` URL is set to
`https://lanc.ai` in `astro.config.mjs`, which drives canonical URLs, the RSS
feed (`/rss.xml`), and the sitemap (`/sitemap-index.xml`).

## Project structure

```
src/
  components/   Header, Footer, YouTube, ArticleCard, FormattedDate
  content/
    articles/   Markdown articles (the "articles" collection)
  layouts/      BaseLayout (head/SEO, header + footer shell)
  lib/          articles.ts — sorting & draft filtering helper
  pages/        index, about, 404, articles/[slug], articles/index, rss.xml
  styles/       global.css (Tailwind v4 + theme)
  consts.ts     site title, author intro, social links
  content.config.ts  content collection schema (zod)
public/         static assets (avatar.png, favicon.svg)
```
