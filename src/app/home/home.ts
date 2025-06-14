import { Component } from '@angular/core';
import { HeroSection } from '../components/hero-section/hero-section';
import { CategoryNews } from '../pages/category-news/category-news';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSection, CategoryNews],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
