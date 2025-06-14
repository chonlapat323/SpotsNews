import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewsArticle } from '../../../core/models/news.model';

@Component({
  selector: 'app-news-card',
  imports: [CommonModule],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  @Input() article!: NewsArticle;
}
