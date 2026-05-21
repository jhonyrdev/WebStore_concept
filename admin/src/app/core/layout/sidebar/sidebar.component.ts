import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'D', route: '/admin/dashboard' },
    { label: 'Productos', icon: 'P', route: '/admin/productos' },
    { label: 'Clientes', icon: 'C', route: '/admin/clientes' }
  ];

  userInfo = {
    name: 'Admin User',
    email: 'admin@webstore.com',
    avatar: 'A'
  };

  constructor(private router: Router) {}

  logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      // ignore
    }
    this.router.navigate(['/']);
    window.location.reload();
  }
}
