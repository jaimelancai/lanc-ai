import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The "articles" collection. Markdown files live in src/content/articles/.
// The filename (without extension) becomes the article's URL slug.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // A YouTube video ID (not a full URL) for an optional embed at the top.
    youtube: z.string().optional(),
    // Drafts are excluded from production builds (see getArticles()).
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
