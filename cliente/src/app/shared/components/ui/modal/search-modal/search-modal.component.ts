import { Component, HostListener, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal.component';
import { SearchService } from 'app/features/search/services/search.service';
import { SearchResultadoComponent } from 'app/features/search/components/search-resultado/search-resultado.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent, SearchResultadoComponent],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css',
})
export class SearchModalComponent {
  isOpen = input.required<boolean>();
  closed = output<void>();

  searchService = inject(SearchService);
  
  onClose(): void {
    this.searchService.limpiarMobile();
    this.closed.emit();
  }
}
