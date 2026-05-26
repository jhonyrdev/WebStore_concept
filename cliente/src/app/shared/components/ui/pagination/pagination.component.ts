import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages  = input.required<number>();
  pageChange  = output<number>();

  readonly pages = computed(() => {
    const total   = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, '...', total];
    }

    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
  });

  goTo(page: number | string): void {
    if (typeof page !== 'number') return;
    if (page < 1 || page > this.totalPages()) return;
    if (page === this.currentPage()) return;
    this.pageChange.emit(page);
  }

  prev(): void { this.goTo(this.currentPage() - 1); }
  next(): void { this.goTo(this.currentPage() + 1); }
}
