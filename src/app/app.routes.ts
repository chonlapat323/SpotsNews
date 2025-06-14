import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CategoryNews } from './pages/category-news/category-news';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'news', component: CategoryNews },
  { path: 'news/:category', component: CategoryNews },
];
