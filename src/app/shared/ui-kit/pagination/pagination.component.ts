import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  private _totalPages: number = 1;
  @Input() set totalPages(val) {
    this._totalPages = Math.min(val, 500);
  }
  get totalPages() {
    return this._totalPages;
  }
  @Input() activePage: number = 1;
  @Input() linksToQuery: string = '';

  private linksPerPage = 11;
  hasMorePagesPrev = false;
  hasMorePagesNext = false;

  get pages() {
    const shift = Math.floor((this.linksPerPage / 2));
    let start = (this.activePage - 1) - shift;
    const end = this.activePage - 1 + Math.max(shift - start, shift);
    start = Math.max(start, 0);
    console.log(start, end);

    this.hasMorePagesNext = end < this.totalPages - shift;
    this.hasMorePagesPrev = start > 0;
    
    return [...new Array(this.totalPages)]
      .map((_, i) => i + 1)
      .slice(start, end);
  }

  constructor(private router: Router) { }

  goToPrevPage() {
    this.router.navigate([], {queryParams: {
      page: this.activePage - 1,
    }})
  }
  
  goToNextPage() {
    this.router.navigate([], {queryParams: {
      page: this.activePage + 1,
    }})
  }
}
