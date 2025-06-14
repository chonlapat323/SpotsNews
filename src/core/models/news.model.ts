export enum NewsLayout {
  GRID = 'grid',
  LIST = 'list',
  MAGAZINE = 'magazine',
}

export interface NewsArticle {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface NewsCategory {
  slug: string;
  name: string;
  articles: NewsArticle[];
  style: NewsLayout;
}

export interface NewsPageData {
  pageType: 'all_categories' | 'single_category';
  categorySlug?: string;
  articles?: NewsArticle[];
  categories?: NewsCategory[];
  latestArticles?: NewsArticle[];
}
