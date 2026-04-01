import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NavheaderComponent } from '../../../shared/components/layout/headers/navheader/navheader.component';

@Component({
  selector: 'app-user-layout.component',
  imports: [NavheaderComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {}
