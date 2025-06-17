import { Component, Input, HostListener } from '@angular/core';
import { NgFor, NgIf, NgClass, NgStyle } from '@angular/common';

export interface Slide {
  url: string;
  title: string;
}

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, NgStyle],
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.scss',
})
export class ImageSlider {
  @Input() slides: Slide[] = [];
  @Input() showControls = true;

  currentSlide = 0;
  previousSlideIndex: number | null = null;
  isAnimating = false;
  exitAnimationClass: 'exit-left' | 'exit-right' | '' = '';

  isDragging = false;
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
    this.currentTranslateX = currentX - this.startX;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {});
  }

  onDragStart(event: MouseEvent, index: number): void {
    if (index !== this.currentSlide || this.isAnimating) return;
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX;
    this.currentTranslateX = 0;
  }

  onDragStartTouch(event: TouchEvent, index: number): void {
    if (index !== this.currentSlide || this.isAnimating) return;
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.currentTranslateX = 0;
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

    // Default styles for cards deep in the stack
    let transform = `scale(0.8) translateY(40px) translateX(0px)`;
    let opacity = 0;
    let zIndex = 0;
    let transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';

    // If this card is the one that was just swiped away...
    if (index === this.previousSlideIndex) {
      // Animate it to the back of the visible stack.
      const targetStackPosition = 2; // Last visible position
      zIndex = slideCount - targetStackPosition;
      transform = `scale(${1 - targetStackPosition * 0.1}) translateY(${
        targetStackPosition * 20
      }px)`;
      opacity = 1;
    }
    // ...otherwise, style cards based on their position in the current stack.
    else if (visualStackPosition < 3) {
      // Show top 3 cards (pos 0, 1, 2)
      opacity = 1;
      zIndex = slideCount - visualStackPosition;
      transform = `scale(${1 - visualStackPosition * 0.1}) translateY(${
        visualStackPosition * 20
      }px)`;

      // If this is the TOP card (the one you can drag)
      if (visualStackPosition === 0) {
        zIndex = slideCount + 1; // Always on top
        const rotation = this.currentTranslateX / 15;
        transform = `translateX(${this.currentTranslateX}px) rotate(${rotation}deg) scale(1) translateY(0)`;

        // Disable transitions while dragging for immediate feedback
        if (this.isDragging) {
          transition = 'none';
        }
      }
    }

    return { transform, opacity, 'z-index': zIndex, transition };
  }
}
