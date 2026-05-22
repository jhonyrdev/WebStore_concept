import { TabItem, TabsComponent } from '@/app/shared/components/ui/tabs/tabs.component';
import { Component, signal } from '@angular/core';

type Tab = 'unidades' | 'pagos' | 'negocio';

@Component({
  selector: 'app-config-admin-page',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './config-admin-page.html',
  styleUrl: './config-admin-page.css',
})
export class ConfigAdminPage {
  activeTab = signal<Tab>('unidades');

  tabs: TabItem<Tab>[] = [
    { key: 'unidades', label: 'Unidades' },
    { key: 'pagos', label: 'Pagos' },
    { key: 'negocio', label: 'Negocio' },
  ];

  changeTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
