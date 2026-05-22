import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAdminComponent } from '@/app/shared/components/layout/sidebars/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-admin-layout.component',
  standalone: true,
  imports: [RouterOutlet, SidebarAdminComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  isLoading = signal(true);
  isMobile = signal(false);
  mobileSidebarOpen = signal(false);

  ngOnInit(): void {
    this.syncViewportState();

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.syncViewportState();
  }

  toggleSidebar(): void {
    this.mobileSidebarOpen.update((value) => !value);
  }

  closeSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  private syncViewportState(): void {
    const mobile = window.innerWidth < 768;
    this.isMobile.set(mobile);

    if (!mobile) {
      this.mobileSidebarOpen.set(false);
    }
  }
}
