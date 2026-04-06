import { CatalogService } from '@/app/pages/landing/catalogo/services/catalog.service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SidebarShellComponent } from '../sidebar-shell/sidebar-shell.component';

@Component({
  selector: 'app-sidebar-catalog',
  standalone: true,
  imports: [SidebarShellComponent],
  templateUrl: './sidebar-catalog.component.html',
  styleUrl: './sidebar-catalog.component.css',
})
export class SidebarCatalogComponent {
  protected catalog = inject(CatalogService);

  showFiltros = signal(false);
  showOrdenar = signal(false);

  readonly sortOptions = [
    { value: 'relevancia', label: 'Relevancia' },
    { value: 'menor', label: 'Menor precio' },
    { value: 'mayor', label: 'Mayor precio' },
    { value: 'az', label: 'A - Z' },
    { value: 'za', label: 'Z - A' },
  ];

  private openSections = signal<Set<string>>(new Set());

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
