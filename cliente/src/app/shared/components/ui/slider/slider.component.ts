import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  @Input() title: string = ''
  @Input() showTitle: boolean = true
  @Input() showControls: boolean = true
  @Input() mode: 'loop' | 'normal' = 'normal'
  @Input() variant: 'category' | 'product' = 'product'

  @ViewChild('sliderTrack') track!: ElementRef<HTMLDivElement>

  trackClass(): string {
    if (this.variant === 'category') {
      // 2 mobile, 3 tablet, 4 laptop, todos en xl
      return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4 px-4'
    }
    // 1 mobile, 2 tablet, 3 laptop, 5 en xl
    return 'flex gap-4 px-4'
  }

  scroll(dir: 'left' | 'right') {
    const el = this.track.nativeElement
    const amount = 200
    if (this.mode === 'loop') {
      const max = el.scrollWidth - el.clientWidth
      const next = el.scrollLeft + (dir === 'right' ? amount : -amount)
      el.scrollLeft = next < 0 ? max : next > max ? 0 : next
    } else {
      el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
    }
  }

}
