import { Component, OnInit, inject } from '@angular/core';
import { HeroSection } from '../components/hero-section/hero-section';
import { CategoryNews } from '../pages/category-news/category-news';
import { Observable } from 'rxjs';
import { NewsList } from '../components/news-list/news-list'; // 3. Import NewsList
import { NewsService } from '../../core/services/news/news.service'; // 4. Import NewsService
import { NewsArticle, NewsLayout } from '../../core/models/news.model'; // 5. Import NewsArticle
import { CommonModule } from '@angular/common'; // 6. Import CommonModule
import { ImageSlider, Slide } from '../components/image-slider/image-slider';
import { NewsSlider } from '../components/news-slider/news-slider'; // แก้ไข: ลบ NewsSlide ออก

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    CategoryNews,
    NewsList,
    CommonModule,
    ImageSlider,
    NewsSlider, // 2. เพิ่ม NewsSlider ใน imports
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  NewsLayout = NewsLayout;
  // 9. สร้างตัวแปรสำหรับเก็บข้อมูลข่าวล่าสุด
  latestArticles$!: Observable<NewsArticle[]>;

  slides: Slide[] = [
    {
      url: 'https://fastly.picsum.photos/id/661/800/600.jpg?hmac=e6OneIIdTl4qqvJAmulmEAC05voz_VPjtxZOcH1Jemo',
      title: 'Slide 1',
    },
    {
      url: 'https://fastly.picsum.photos/id/34/800/600.jpg?hmac=5xfFfzzzjPcwWSRP38TzE_T0JtMfVmPRLyRTp-hYjnM',
      title: 'Slide 2',
    },
    {
      url: 'https://fastly.picsum.photos/id/729/800/600.jpg?hmac=MRoTEeH27I_xuVQR1GlOPX26TXt_x5ZJ-Okkv1E6Vb8',
      title: 'Slide 3',
    },
    {
      url: 'https://fastly.picsum.photos/id/914/800/600.jpg?hmac=vd0Py-_rhXLg_hZXDCH2_LkaDsrplnz1i222M2HrcgU',
      title: 'Slide 4',
    },
    { url: 'https://picsum.photos/800/600?random=5', title: 'Slide 5' },
  ];

  // 10. Inject NewsService
  private newsService = inject(NewsService);

  // 11. สร้าง ngOnInit
  ngOnInit(): void {
    // 12. เรียกใช้ service เพื่อดึงข่าวล่าสุด (เช่น 8 ข่าว)
    this.latestArticles$ = this.newsService.getLatestArticles(8);
  }
}
