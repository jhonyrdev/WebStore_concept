import { Component, signal } from '@angular/core';
import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';

type Tab = 'productos' | 'categorias' | 'marca';

@Component({
  selector: 'app-productos-admin-page',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './productos-admin-page.html',
  styleUrl: './productos-admin-page.css',
})
export class ProductosAdminPage {
  activeTab = signal<Tab>('productos');

  tabs: TabItem<Tab>[] = [
    { key: 'productos', label: 'Productos' },
    { key: 'categorias', label: 'Categorias' },
    { key: 'marca', label: 'Marca' },
  ];

  changeTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
