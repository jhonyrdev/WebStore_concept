import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollLockService {
  private readonly document = inject(DOCUMENT);
  private lockCount = 0;
  private previousOverflow = '';
  private previousTouchAction = '';

  lock(): void {
    if (this.lockCount === 0) {
      const body = this.document.body;
      this.previousOverflow = body.style.overflow;
      this.previousTouchAction = body.style.touchAction;
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
    }

    this.lockCount += 1;
  }

  unlock(): void {
    if (this.lockCount === 0) {
      return;
    }

    this.lockCount -= 1;

    if (this.lockCount > 0) {
      return;
    }

    const body = this.document.body;
    body.style.overflow = this.previousOverflow;
    body.style.touchAction = this.previousTouchAction;
  }
}