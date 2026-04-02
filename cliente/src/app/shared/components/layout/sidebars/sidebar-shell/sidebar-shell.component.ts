import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-shell',
  standalone: true,
  templateUrl: './sidebar-shell.component.html',
  styleUrl: './sidebar-shell.component.css',
})
export class SidebarShellComponent {
  isOpen = input.required<boolean>()
  title  = input<string>('Menú')
  toggle = output<void>()
}
