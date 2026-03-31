import { Component, OnInit, inject, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../../../../core/services/producto_Services/categorias/categoria.service';
import { SkeletonCategoriaComponent } from "../../skeleton/skeleton-categoria/skeleton-categoria.component";

@Component({
  selector: 'app-slider-categorias',
  standalone: true,
  imports: [RouterModule, SkeletonCategoriaComponent],
  templateUrl: './slider-categorias.component.html',
  styleUrl: './slider-categorias.component.css',
})
export class SliderCategoriasComponent {
  readonly categoriasService = inject(CategoriaService);

  totalImages = 0;
  loadedImages = 0;
  allImagesLoaded = false;

  constructor() {
    this.categoriasService.loadCategories();

    effect(() => {
      const cats = this.categoriasService.categories();
      if (cats.length > 0) {
        this.totalImages = cats.length;
        this.loadedImages = 0;
        this.allImagesLoaded = false;
      }
    });
  }

  onImageLoad(): void {
    this.loadedImages++;
    if (this.loadedImages >= this.totalImages) {
      this.allImagesLoaded = true;
    }
  }
}