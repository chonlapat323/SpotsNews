// 1. เปลี่ยน import ให้ครบถ้วน
import { Component, Input, HostListener } from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle } from '@angular/common';
import { NewsArticle } from '../../../core/models/news.model';

@Component({
  selector: 'app-news-slider', // 3. เปลี่ยน selector
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle],
  templateUrl: './news-slider.html', // 4. ตรวจสอบให้แน่ใจว่าไฟล์ .html และ .scss ถูกต้อง
  styleUrl: './news-slider.scss',
})
// 5. เปลี่ยนชื่อ Class เป็น NewsSlider และ Input ที่รับข้อมูล
export class NewsSlider {
  @Input() slides: NewsArticle[] = [];
  @Input() showControls = true;

  // --- ส่วนที่เหลือของโค้ด (ตรรกะการลาก, แอนิเมชัน, z-index) ---
  // --- สามารถคัดลอกมาวางได้เลยโดยไม่ต้องแก้ไขอะไรเพิ่มเติม ---

  currentSlide = 0;
  previousSlideIndex: number | null = null;
  isAnimating = false;
  exitAnimationClass: 'exit-left' | 'exit-right' | '' = '';
  isDragging = false;
  private wasDragged = false;
  startX = 0;
  currentTranslateX = 0;
  private animationFrameId: number | null = null;

  @HostListener('window:mousemove', ['$event'])
  onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.updatePosition(event.clientX);
  }

  @HostListener('window:touchmove', ['$event'])
  onDragMoveTouch(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.updatePosition(event.touches[0].clientX);
  }

  @HostListener('window:mouseup')
  onDragEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.handleSwipe();
  }

  @HostListener('window:touchend')
  onDragEndTouch(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.handleSwipe();
  }

  private updatePosition(currentX: number): void {
    const deltaX = Math.abs(currentX - this.startX);
    if (deltaX > 10 && !this.wasDragged) {
      this.wasDragged = true;
    }

    this.currentTranslateX = currentX - this.startX;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {});
  }

  onDragStart(event: MouseEvent, index: number): void {
    if (index !== this.currentSlide || this.isAnimating) return;
    this.wasDragged = false;
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX;
    this.currentTranslateX = 0;
  }

  onDragStartTouch(event: TouchEvent, index: number): void {
    if (index !== this.currentSlide || this.isAnimating) return;
    this.wasDragged = false;
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.currentTranslateX = 0;
  }

  onCardClick(event: MouseEvent): void {
    if (this.wasDragged) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleSwipe(): void {
    if (this.isAnimating) {
      this.currentTranslateX = 0;
      return;
    }
    const swipeThreshold = 100;
    if (Math.abs(this.currentTranslateX) > swipeThreshold) {
      if (this.currentTranslateX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    this.currentTranslateX = 0;
  }

  nextSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.exitAnimationClass = 'exit-left';

    setTimeout(() => {
      this.previousSlideIndex = this.currentSlide;
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.exitAnimationClass = '';

      setTimeout(() => {
        this.previousSlideIndex = null;
        this.isAnimating = false;
      }, 500);
    }, 500);
  }

  prevSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.exitAnimationClass = 'exit-right';

    setTimeout(() => {
      this.previousSlideIndex = this.currentSlide;
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.exitAnimationClass = '';

      setTimeout(() => {
        this.previousSlideIndex = null;
        this.isAnimating = false;
      }, 500);
    }, 500);
  }

  goToSlide(index: number): void {
    if (index === this.currentSlide || this.isAnimating) return;
    this.isAnimating = true;
    this.previousSlideIndex = this.currentSlide;
    this.currentSlide = index;
    setTimeout(() => {
      this.previousSlideIndex = null;
      this.isAnimating = false;
    }, 500);
  }

  getSlideStyle(index: number) {
    const slideCount = this.slides.length;
    let visualStackPosition =
      (index - this.currentSlide + slideCount) % slideCount;

    let transform = `scale(0.8) translateY(40px) translateX(0px)`;
    let opacity = 0;
    let zIndex = 0;
    let transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';

    if (index === this.previousSlideIndex) {
      const targetStackPosition = 2;
      zIndex = slideCount - targetStackPosition;
      transform = `scale(${1 - targetStackPosition * 0.1}) translateY(${
        targetStackPosition * 20
      }px)`;
      opacity = 1;
    } else if (visualStackPosition < 3) {
      opacity = 1;
      zIndex = slideCount - visualStackPosition;
      transform = `scale(${1 - visualStackPosition * 0.1}) translateY(${
        visualStackPosition * 20
      }px)`;

      if (visualStackPosition === 0) {
        zIndex = slideCount + 1;
        const rotation = this.currentTranslateX / 15;
        transform = `translateX(${this.currentTranslateX}px) rotate(${rotation}deg) scale(1) translateY(0)`;

        if (this.isDragging) {
          transition = 'none';
        }
      }
    }

    return { transform, opacity, 'z-index': zIndex, transition };
  }
}
