import { Component, input, model } from '@angular/core';

export interface SortOption<T = string> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-sort-select',
  imports: [],
  templateUrl: './sort-select.component.html',
})
export class SortSelectComponent {
  value = model<any>(null);
  options = input<SortOption[]>([]);
  label = input<string>('Ordenar por:');
}
