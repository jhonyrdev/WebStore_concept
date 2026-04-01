import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  @Input() title: string = '';
  @Input() mode: 'loop' | 'normal' = 'normal';
  @ViewChild('sliderTrack') track!: ElementRef<HTMLDivElement>;

  scroll(dir: 'left' | 'right') {
    const el = this.track.nativeElement;
    const amount = 200;

    if (this.mode === 'loop') {
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + (dir === 'right' ? amount : -amount);
      el.scrollLeft = next < 0 ? max : next > max ? 0 : next;
    } else {
      el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    }
  }
}
