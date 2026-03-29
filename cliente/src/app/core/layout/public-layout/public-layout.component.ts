import { Component } from '@angular/core';

import { RouterOutlet } from "@angular/router";
import { PublicFooterComponent } from "../../../shared/components/footers/public-footer/public-footer.component";
import { NavheaderComponent } from '../../../shared/components/headers/navheader/navheader.component';

@Component({
  selector: 'app-public-layout.component',
  imports: [NavheaderComponent, RouterOutlet, PublicFooterComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {

}
