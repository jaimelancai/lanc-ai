import rss from '@astrojs/rss';
import { getArticles } from '../lib/articles';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const articles = await getArticles();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // context.site is the `site` value from astro.config (https://lanc.ai).
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.id}/`,
    })),
  });
}
