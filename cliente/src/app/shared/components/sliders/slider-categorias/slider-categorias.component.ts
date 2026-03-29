import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
 
export interface Category {
  label: string;
  sublabel?: string;
  imgSrc: string;
  route: string;
  featured?: boolean;
}

@Component({
  selector: 'app-slider-categorias',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './slider-categorias.component.html',
  styleUrl: './slider-categorias.component.css',
})
export class SliderCategoriasComponent implements OnInit {
  categories = signal<Category[]>([]);
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Category[]>('/data/categorias.json')
      .subscribe({
        next: (data) => this.categories.set(data),
        error: (err) => console.error('Error cargando categorías:', err)
      });
  }
}
