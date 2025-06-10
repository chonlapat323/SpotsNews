import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
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
}
