import { Component, Input } from '@angular/core';
import { NewsArticle } from '../../../core/models/news.model';
import { CommonModule } from '@angular/common';

export enum NewsLayout {
  GRID = 'grid',
  LIST = 'list',
  MAGAZINE = 'magazine',
}

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss',
})
export class NewsList {
  @Input() articles: NewsArticle[] = [];
  @Input() layout: NewsLayout = NewsLayout.GRID;
  NewsLayout = NewsLayout; // ทำให้ enum สามารถใช้ใน template ได้
}
