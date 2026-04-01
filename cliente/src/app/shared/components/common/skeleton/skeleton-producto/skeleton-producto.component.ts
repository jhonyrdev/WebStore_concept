import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-producto',
  standalone: true,
  templateUrl: './skeleton-producto.component.html',
})
export class SkeletonProductoComponent {
  @Input() count: number = 3
  protected items = computed(() => Array(this.count).fill(0))
}
