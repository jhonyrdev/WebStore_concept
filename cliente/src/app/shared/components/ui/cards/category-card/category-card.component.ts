import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../features/categories/models/category.model';
import { RouterLink } from '@angular/router';
import { CATEGORIA_CONFIG } from '../../../../constants/categoria.config';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input({ required: true }) category!: Category;
  @Output() imageLoad = new EventEmitter<void>();

  get config() {
    return CATEGORIA_CONFIG[this.category.id];
  }
}
