import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/**
 * Returns all articles sorted by pubDate descending (most recent first).
 * Drafts are excluded in production builds but kept in dev so you can preview them.
 */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  return articles.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
