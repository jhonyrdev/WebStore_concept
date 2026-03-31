import { Component } from '@angular/core';
import { HeroComponent } from '../../../shared/components/hero/hero.component';
import { SliderCategoriasComponent } from "../../../shared/components/sliders/slider-categorias/slider-categorias.component";
import { SliderProductoComponent } from '../../../shared/components/sliders/slider-producto/slider-producto.component';

@Component({
  selector: 'app-inicio',
  imports: [HeroComponent, SliderCategoriasComponent, SliderProductoComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
