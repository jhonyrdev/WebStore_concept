import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-categoria',
  standalone: true,
  imports: [],
  templateUrl: './skeleton-categoria.component.html'
})
export class SkeletonCategoriaComponent {
  @Input() count = 8;

  items = Array.from({ length: this.count });
}
