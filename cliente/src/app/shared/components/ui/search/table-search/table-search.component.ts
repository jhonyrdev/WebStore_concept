import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [],
  templateUrl: './table-search.component.html',
  styleUrl: './table-search.component.css',
})
export class TableSearchComponent {
  readonly placeholder = input<string>('Buscar…');
  readonly query = model<string>('');
 
  clear(): void {
    this.query.set('');
  }
}
