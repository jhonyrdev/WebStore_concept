import { Component, inject, signal } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-panel-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './panel-catalogo.component.html',
  styleUrl: './panel-catalogo.component.css',
})
export class PanelCatalogoComponent {
  protected catalog = inject(CatalogService);
 
  activeTab = signal<'categorias' | 'filtros'>('categorias');
 
  private openSections = signal<Set<string>>(new Set());
 
  isSectionOpen(section: string): boolean {
    return this.openSections().has(section);
  }
 
  toggleSection(section: string): void {
    this.openSections.update(set => {
      const next = new Set(set);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  }
}
