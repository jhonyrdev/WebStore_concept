import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarAdminComponent } from '@/app/shared/components/layout/sidebars/sidebar-admin/sidebar-admin.component';
import { AdminFooterComponent } from "@/app/shared/components/layout/footers/admin-footer/admin-footer.component";
import { AdminHeaderComponent } from "@/app/shared/components/layout/headers/admin-header/admin-header.component";

@Component({
  selector: 'app-admin-layout.component',
  standalone: true,
  imports: [RouterOutlet, SidebarAdminComponent, AdminFooterComponent, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  isLoading = signal(true);
  isMobile = signal(false);
  isTablet = signal(false);
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
  const width = window.innerWidth;
  const mobile = width < 421;
  const tablet = width >= 421 && width < 1024;

  this.isMobile.set(mobile);
  this.isTablet.set(tablet);

  if (mobile) {
    this.mobileSidebarOpen.set(false);
  }
}
}
