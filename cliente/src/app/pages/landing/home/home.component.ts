import { Component } from '@angular/core';
import { CategorySectionComponent } from '../../../features/categories/components/category-section/category-section.component';
import { ProductSectionComponent } from '../../../features/product/components/product-section/product-section.component';
import { HeroComponent } from "./components/hero/hero.component";


@Component({
  selector: 'app-home.component',
  standalone: true,
  imports: [CategorySectionComponent, ProductSectionComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
