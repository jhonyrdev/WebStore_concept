import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, OnDestroy, OnInit, output, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

export interface SearchResult {
  id: string | number;
  label: string;
  description?: string;
  category?: string;
  icon?: string;
  metadata?: Record<string, unknown>;
}

export interface SearchConfig {
  placeholder?: string;
  debounceMs?: number;
  minChars?: number;
  maxResults?: number;
  showCategories?: boolean;
  showRecentSearches?: boolean;
  clearable?: boolean;
  autoFocus?: boolean;
}

@Component({
  selector: 'app-search-drowdop',
  standalone: true,
  imports: [FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-drowdop.component.html',

})
export class SearchDrowdopComponent implements OnInit, OnDestroy {
  // Inputs
  readonly config = input<SearchConfig>({});
  readonly results = input<SearchResult[]>([]);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  // Outputs
  readonly searchChange = output<string>();
  readonly resultSelect = output<SearchResult>();
  readonly searchSubmit = output<string>();
  readonly cleared = output<void>();

  // View child
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  // State signals
  readonly query = signal('');
  readonly isFocused = signal(false);
  readonly isExpanded = signal(false);
  readonly activeIndex = signal(-1);
  readonly recentSearches = signal<string[]>([]);

  // Computed
  readonly effectiveConfig = computed<Required<SearchConfig>>(() => ({
    placeholder: 'Search…',
    debounceMs: 300,
    minChars: 1,
    maxResults: 8,
    showCategories: true,
    showRecentSearches: true,
    clearable: true,
    autoFocus: false,
    ...this.config(),
  }));

  readonly hasQuery = computed(() => this.query().trim().length > 0);

  readonly showDropdown = computed(
    () =>
      this.isFocused() &&
      (this.hasQuery()
        ? this.query().length >= this.effectiveConfig().minChars
        : this.effectiveConfig().showRecentSearches &&
          this.recentSearches().length > 0)
  );

  readonly groupedResults = computed(() => {
    const items = this.results().slice(0, this.effectiveConfig().maxResults);
    if (!this.effectiveConfig().showCategories) return { '': items };

    return items.reduce(
      (acc, item) => {
        const cat = item.category ?? '';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      },
      {} as Record<string, SearchResult[]>
    );
  });

  readonly groupKeys = computed(() => Object.keys(this.groupedResults()));

  readonly flatResults = computed(() =>
    this.groupKeys().flatMap((k) => this.groupedResults()[k])
  );

  readonly hasResults = computed(() => this.flatResults().length > 0);

  private readonly searchSubject = new Subject<string>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly STORAGE_KEY = 'app_recent_searches';

  ngOnInit(): void {
    this.loadRecentSearches();

    this.searchSubject
      .pipe(
        debounceTime(this.effectiveConfig().debounceMs),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => this.searchChange.emit(value));

    if (this.effectiveConfig().autoFocus) {
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
    }
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onInput(value: string): void {
    this.query.set(value);
    this.activeIndex.set(-1);
    this.searchSubject.next(value);
  }

  onFocus(): void {
    this.isFocused.set(true);
    this.isExpanded.set(true);
  }

  onBlur(): void {
    // Delay to allow click events on results
    setTimeout(() => {
      this.isFocused.set(false);
      this.isExpanded.set(false);
      this.activeIndex.set(-1);
    }, 150);
  }

  onKeydown(event: KeyboardEvent): void {
    const flat = this.flatResults();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i) => Math.min(i + 1, flat.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i) => Math.max(i - 1, -1));
        break;
      case 'Enter':
        event.preventDefault();
        const idx = this.activeIndex();
        if (idx >= 0 && flat[idx]) {
          this.selectResult(flat[idx]);
        } else {
          this.submit();
        }
        break;
      case 'Escape':
        this.clear();
        this.searchInput()?.nativeElement.blur();
        break;
    }
  }

  selectResult(result: SearchResult): void {
    this.query.set(result.label);
    this.saveRecentSearch(result.label);
    this.resultSelect.emit(result);
    this.isExpanded.set(false);
  }

  selectRecent(term: string): void {
    this.query.set(term);
    this.searchChange.emit(term);
    this.isExpanded.set(false);
  }

  submit(): void {
    const q = this.query().trim();
    if (!q) return;
    this.saveRecentSearch(q);
    this.searchSubmit.emit(q);
    this.isExpanded.set(false);
  }

  clear(): void {
    this.query.set('');
    this.activeIndex.set(-1);
    this.searchChange.emit('');
    this.cleared.emit();
    this.searchInput()?.nativeElement.focus();
  }

  removeRecent(term: string, event: MouseEvent): void {
    event.stopPropagation();
    this.recentSearches.update((list) => list.filter((s) => s !== term));
    this.saveRecentSearches();
  }

  isActive(result: SearchResult): boolean {
    const idx = this.activeIndex();
    return idx >= 0 && this.flatResults()[idx]?.id === result.id;
  }

  trackByResult(_: number, item: SearchResult): string | number {
    return item.id;
  }

  private loadRecentSearches(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      this.recentSearches.set(stored ? JSON.parse(stored) : []);
    } catch {
      this.recentSearches.set([]);
    }
  }

  private saveRecentSearch(term: string): void {
    const trimmed = term.trim();
    if (!trimmed) return;
    this.recentSearches.update((list) => {
      const next = [trimmed, ...list.filter((s) => s !== trimmed)].slice(0, 5);
      return next;
    });
    this.saveRecentSearches();
  }

  private saveRecentSearches(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.recentSearches())
      );
    } catch {}
  }
}
