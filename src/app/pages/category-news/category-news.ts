import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../core/services/news/news.service';
import { forkJoin } from 'rxjs';
import { NewsLayout } from '../../components/news-list/news-list';
import {
  NewsArticle,
  NewsCategory,
  NewsPageData,
} from '../../../core/models/news.model';
import { NewsList } from '../../components/news-list/news-list';
@Component({
  selector: 'app-category-news',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsList],
  templateUrl: './category-news.html',
  styleUrl: './category-news.scss',
})
export class CategoryNews implements OnInit {
  NewsLayout = NewsLayout;
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService); // 1. Inject NewsService

  // เปลี่ยนเป็น Observable ของ Interface ที่เราสร้างขึ้น
  data$!: Observable<NewsPageData>;

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const categorySlug = params.get('category');

        if (categorySlug) {
          // --- กรณีมี Slug: แสดงข่าวในหมวดหมู่นั้น ---
          return this.newsService.getNewsByCategory(categorySlug).pipe(
            map((articles) => ({
              pageType: 'single_category' as const,
              categorySlug: categorySlug,
              articles: articles,
            }))
          );
        } else {
          // --- กรณีไม่มี Slug: แสดงหมวดหมู่ทั้งหมด ---
          // ★ แก้ไข: เรียกใช้ service ที่ดึงข้อมูลหมวดหมู่พร้อมข่าวมาเลย
          return this.newsService.getAllCategoriesWithArticles(3).pipe(
            map((categoriesWithNews) => ({
              pageType: 'all_categories' as const,
              categories: categoriesWithNews,
            }))
          );
        }
      })
    );
  }
}
