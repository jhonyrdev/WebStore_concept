import { Component, OnInit, inject, signal, effect } from '@angular/core';

import { CategoriaService } from '@/app/features/categories/services/categorias/categoria.service';
import { SubcategoriaService } from '@/app/features/categories/services/subcategorias/subcategoria.service';
import { MarcaService } from '@/app/features/product/services/Marca/marca.service';
import { MarcaListDto } from '@/app/features/product/models/marca.model';
import { SubCategoriaListDto } from '@/app/features/categories/models/subcategoria.model';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-panel-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './panel-catalogo.component.html',
  styleUrl: './panel-catalogo.component.css',
})
export class PanelCatalogoComponent implements OnInit {
  protected catalog = inject(CatalogService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly subcategoriaService = inject(SubcategoriaService);
  private readonly marcaService = inject(MarcaService);

  activeTab = signal<'categorias' | 'filtros'>('categorias');

  subCategorias = signal<SubCategoriaListDto[]>([]);
  marcas = signal<MarcaListDto[]>([]);

  private openSections = signal<Set<string>>(new Set());

  constructor() {
    effect(() => {
      const categoriaId = this.catalog.categoriaId();
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
    }); // 👈 Solo cierra el paréntesis del effect, sin el objeto de opciones al final.
  }

  ngOnInit(): void {
    this.categoriaService.loadCategories();
  }

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
}
