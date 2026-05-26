import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ScrollLockService } from '@shared/services/scroll-lock.service';
import { SidebarShellComponent } from '../sidebar-shell/sidebar-shell.component';
import { CatalogService } from '@/app/pages/landing/catalogo/components/services/catalog.service';
import { SubcategoriaService } from '@/app/features/categories/services/subcategorias/subcategoria.service';
import { MarcaService } from '@/app/features/product/services/Marca/marca.service';
import { SubCategoriaListDto } from '@/app/features/categories/models/subcategoria.model';
import { MarcaListDto } from '@/app/features/product/models/marca.model';

@Component({
  selector: 'app-sidebar-catalog',
  standalone: true,
  imports: [SidebarShellComponent],
  templateUrl: './sidebar-catalog.component.html',
  styleUrl: './sidebar-catalog.component.css',
})
export class SidebarCatalogComponent implements OnInit {
  protected catalog = inject(CatalogService);
  private readonly scrollLockService = inject(ScrollLockService);
  private readonly subcategoriaService = inject(SubcategoriaService);
  private readonly marcaService = inject(MarcaService);

  showFiltros = signal(false);
  showOrdenar = signal(false);

  subCategorias = signal<SubCategoriaListDto[]>([]);
  marcas = signal<MarcaListDto[]>([]);

  readonly sortOptions = [
    { value: 'relevancia', label: 'Relevancia' },
    { value: 'menor', label: 'Menor precio' },
    { value: 'mayor', label: 'Mayor precio' },
    { value: 'az', label: 'A - Z' },
    { value: 'za', label: 'Z - A' },
  ];

  private openSections = signal<Set<string>>(new Set());

  constructor() {
    // Scroll lock al abrir ordenar
    effect((onCleanup) => {
      if (!this.showOrdenar()) return;
      this.scrollLockService.lock();
      onCleanup(() => this.scrollLockService.unlock());
    });

    // Cargar subcategorías y marcas según estado
    effect(() => {
      const categoriaId    = this.catalog.categoriaId();
      const subCategoriaId = this.catalog.subCategoriaId();

      if (subCategoriaId !== null) {
        this.marcaService
          .listarPorSubCategoria(subCategoriaId)
          .subscribe((marcas) => this.marcas.set(marcas));

      } else if (categoriaId !== null) {
        this.subcategoriaService
          .listarPorCategoria(categoriaId)
          .subscribe((subs) => this.subCategorias.set(subs));
        this.marcaService
          .listarPorCategoria(categoriaId)
          .subscribe((marcas) => this.marcas.set(marcas));

      } else {
        this.subcategoriaService
          .listar()
          .subscribe((subs) => this.subCategorias.set(subs));
        this.marcaService
          .listar()
          .subscribe((marcas) => this.marcas.set(marcas));
      }
    });
  }

  ngOnInit(): void {}

  isSectionOpen(section: string): boolean {
    return this.openSections().has(section);
  }

  toggleSection(section: string): void {
    this.openSections.update((set) => {
      const next = new Set(set);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  }

  closeFiltros(): void {
    this.showFiltros.set(false);
  }

  closeOrdenar(): void {
    this.showOrdenar.set(false);
  }
}