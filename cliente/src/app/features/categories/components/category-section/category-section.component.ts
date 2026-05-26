import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { SkeletonCategoriaComponent } from '../../../../shared/components/common/skeleton/skeleton-categoria/skeleton-categoria.component';
import { CategoryCardComponent } from '../../../../shared/components/ui/cards/category-card/category-card.component';
import { SliderComponent } from '../../../../shared/components/ui/slider/slider.component';
import { CategoriaService } from '../../services/categorias/categoria.service';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [SliderComponent, CategoryCardComponent, SkeletonCategoriaComponent],
  templateUrl: './category-section.component.html',
})
export class CategorySectionComponent implements OnInit {
  categoriasService = inject(CategoriaService);

  private loadedImages = signal(0);

  ngOnInit(): void {
    this.categoriasService.loadCategories();
  }

  allImagesLoaded = computed(
    () => this.loadedImages() >= (this.categoriasService.categories()?.length ?? 0),
  );

  onImageLoad() {
    this.loadedImages.update((n) => n + 1);
  }
}
