import { Injectable, signal, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService implements OnDestroy {
  private windowSize = signal(window.innerWidth);

  pageSize = signal(this.calculatePageSize(window.innerWidth));

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize() {
    const width = window.innerWidth;
    this.windowSize.set(width);
    this.pageSize.set(this.calculatePageSize(width));
  }

  private calculatePageSize(width: number): number {
    if (width >= 1024) return 10; // Desktop (lg)
    if (width >= 768) return 6; // Tablet (md)
    return 5; // Mobile (sm)
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}
