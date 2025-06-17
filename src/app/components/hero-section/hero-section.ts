import { Component, inject, Input } from '@angular/core';
import { NewsSlider } from '../news-slider/news-slider';
import { NewsArticle } from '../../../core/models/news.model';
import { Observable } from 'rxjs';
import { NewsService } from '../../../core/services/news/news.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NewsSlider, CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() tag: string = '';
  @Input() date: string = '';

  @Input() sideNews1: {
    imageUrl: string;
    title: string;
    tag: string;
    date: string;
  } = { imageUrl: '', title: '', tag: '', date: '' };
  @Input() sideNews2: {
    imageUrl: string;
    title: string;
    tag: string;
    date: string;
  } = { imageUrl: '', title: '', tag: '', date: '' };

  latestArticles$!: Observable<NewsArticle[]>;

  // 10. Inject NewsService
  private newsService = inject(NewsService);

  // 11. สร้าง ngOnInit
  ngOnInit(): void {
    // 12. เรียกใช้ service เพื่อดึงข่าวล่าสุด (เช่น 8 ข่าว)
    this.latestArticles$ = this.newsService.getLatestArticles(8);
  }
}
