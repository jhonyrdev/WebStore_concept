import { Component, input, OnInit, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../../../core/services/producto_Services/categorias/categoria.service';

@Component({
  selector: 'app-sidebar-categoria',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './sidebar-categoria.component.html',
  styleUrl: './sidebar-categoria.component.css',
})
export class SidebarCategoriaComponent implements OnInit {
  isMenuOpen = input.required<boolean>();
  toggleMenu = output<void>();

  private readonly categoriaService = inject(CategoriaService);

  readonly categorias = this.categoriaService.categories;
  readonly isLoading = this.categoriaService.isLoading;
  readonly error = this.categoriaService.error;

  ngOnInit(): void {
    this.categoriaService.loadCategories();
  }

  onToggle(): void {
    this.toggleMenu.emit();
  }
}
