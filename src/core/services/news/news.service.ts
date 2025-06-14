// src/app/core/services/news/news.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { NewsArticle, NewsCategory, NewsLayout } from '../../models/news.model'; // <--- Path ที่ถูกต้อง
import { MOCK_NEWS_CATEGORIES } from './news.mock';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor() {}

  /**
   * ดึงข้อมูลข่าวทั้งหมดในหมวดหมู่ที่ระบุ
   * @param categorySlug Slug ของหมวดหมู่ เช่น 'premier-league'
   * @returns Observable ของอาร์เรย์ข่าวในหมวดหมู่นั้น
   */
  getNewsByCategory(categorySlug: string): Observable<NewsArticle[]> {
    const category = MOCK_NEWS_CATEGORIES.find((c) => c.slug === categorySlug);
    // หากไม่พบ category ที่ตรงกัน ให้คืนค่าเป็น array ว่าง
    const articles = category ? category.articles : [];

    // จำลองการดึงข้อมูลจาก Network โดยให้มี delay เล็กน้อย
    return of(articles).pipe(delay(500));
  }

  /**
   * (เมธอดใหม่) ดึงข่าวล่าสุดจากทุกหมวดหมู่
   * @param limitPerCategory จำนวนข่าวสูงสุดที่จะดึงจากแต่ละหมวดหมู่
   * @returns Observable ของอาร์เรย์ข่าวที่รวมมาจากทุกหมวด
   */
  getLatestNewsFromAllCategories(limit: number = 2): Observable<NewsArticle[]> {
    const latestNews = MOCK_NEWS_CATEGORIES.flatMap((category) =>
      // สำหรับแต่ละ category, ให้ slice เอาเฉพาะข่าวล่าสุดมาตามจำนวน limit
      category.articles.slice(0, limit)
    );

    // อาจจะ sort ตามวันที่อีกครั้งถ้าต้องการ
    latestNews.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return of(latestNews).pipe(delay(400));
  }

  /**
   * ดึงข้อมูลเฉพาะของหมวดหมู่ (ชื่อและ slug) ไม่รวมบทความ
   * @returns Observable ของอาร์เรย์หมวดหมู่
   */
  getCategories(): Observable<Omit<NewsCategory, 'articles'>[]> {
    const categories = MOCK_NEWS_CATEGORIES.map(({ slug, name }) => ({
      slug,
      name,
      style: NewsLayout.GRID,
    }));
    return of(categories).pipe(delay(200));
  }

  /**
   * (เมธอดใหม่) ดึงข้อมูลหมวดหมู่ทั้งหมด พร้อมกับข่าวในแต่ละหมวดหมู่ (จำกัดจำนวนได้)
   * @param limitPerCategory จำนวนข่าวสูงสุดที่จะดึงในแต่ละหมวด, ถ้าไม่ระบุคือเอาทั้งหมด
   * @returns Observable ของอาร์เรย์หมวดหมู่พร้อมข่าว
   */
  getAllCategoriesWithArticles(
    limitPerCategory?: number
  ): Observable<NewsCategory[]> {
    const categoriesWithLimitedNews = MOCK_NEWS_CATEGORIES.map((category) => {
      // ถ้ามี limit ให้ slice บทความ, ถ้าไม่มีก็เอาไปทั้งหมด
      const articles = limitPerCategory
        ? category.articles.slice(0, limitPerCategory)
        : category.articles;

      return {
        ...category, // คัดลอก property อื่นๆ ของ category มาทั้งหมด
        articles: articles, // ใช้ articles ที่ผ่านการ slice แล้ว
      };
    });

    return of(categoriesWithLimitedNews).pipe(delay(500));
  }

  /**
   * ดึงข้อมูลข่าวเพียงชิ้นเดียวจาก ID ของข่าว
   * @param articleId ID ของข่าวที่ต้องการ
   * @returns Observable ของข่าวชิ้นนั้น หรือ undefined หากไม่พบ
   */
  getArticleById(articleId: string): Observable<NewsArticle | undefined> {
    // ใช้ flatMap เพื่อแปลง array ของ category ให้เป็น array ของข่าวทั้งหมด
    const allArticles = MOCK_NEWS_CATEGORIES.flatMap((c) => c.articles);
    const article = allArticles.find((a) => a.id === articleId);
    return of(article).pipe(delay(300));
  }
}
