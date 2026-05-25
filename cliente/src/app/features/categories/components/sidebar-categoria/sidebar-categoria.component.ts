import { Component, input, OnInit, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categorias/categoria.service';
import { SidebarShellComponent } from '../../../../shared/components/layout/sidebars/sidebar-shell/sidebar-shell.component';

@Component({
  selector: 'app-sidebar-categoria',
  imports: [RouterLink, SidebarShellComponent],
  standalone: true,
  templateUrl: './sidebar-categoria.component.html',
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
