import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PanelCatalogoComponent } from "@/app/pages/landing/catalogo/components/panel-catalogo/panel-catalogo.component";
import { SidebarCatalogComponent } from "@/app/shared/components/layout/sidebars/sidebar-catalog/sidebar-catalog.component";
import { CatalogService } from '@/app/pages/landing/catalogo/components/services/catalog.service';

@Component({
  selector: 'app-catalog-layout',
  imports: [RouterOutlet, PanelCatalogoComponent, SidebarCatalogComponent],
  templateUrl: './catalog-layout.component.html',
  styleUrl: './catalog-layout.component.css',
})
export class CatalogLayoutComponent {
  protected catalog = inject(CatalogService);
}
