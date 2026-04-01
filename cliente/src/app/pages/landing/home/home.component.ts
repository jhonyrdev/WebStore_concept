import { Component } from '@angular/core';
import { HeroComponent } from "../../../shared/components/hero/hero.component";
import { CategorySectionComponent } from '../../../features/categories/components/category-section/category-section.component';
import { ProductSectionComponent } from '../../../features/product/components/product-section/product-section.component';


@Component({
  selector: 'app-home.component',
  standalone: true,
  imports: [HeroComponent, CategorySectionComponent, ProductSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
