import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TMDB_CATEGORY_MAX_PAGE } from 'src/app/core/types/tmdb.constants';

@Component({
  selector: 'ui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  private _totalPages: number = 1;
  @Input() set totalPages(val) {
    this._totalPages = Math.min(val, TMDB_CATEGORY_MAX_PAGE);
  }
  get totalPages() {
    return this._totalPages;
  }
  
  @Input() activePage: number = 1;
  @Input() linksToQuery: string = '';
  @Input() linksPerPage: number = 9;

  get hasMorePagesPrev(): boolean {
    return this.getshiftedPoint('start') > 0;
  }
  
  get hasMorePagesNext():boolean {
    return this.getshiftedPoint('end') < this.totalPages;
  }

  get pages() {
    const start = this.getshiftedPoint('start');
    const end = this.getshiftedPoint('end');
    
    const startIndex = start - Math.max(end - this.totalPages, 0);
    const endIndex = end - Math.min(start, 0);
  
    return [...new Array(this.totalPages)]
      .map((_, i) => i + 1)
      .slice(
        Math.max(startIndex, 0),
        Math.min(endIndex, this.totalPages)
      );
  }

  constructor(private router: Router) { }

  private getshiftedPoint(side: 'start' | 'end') {
    const shift = Math[side === 'start' ? 'floor' : 'ceil'](this.linksPerPage / 2);
    return (this.activePage - 1) + (side === 'start' ? -shift : +shift);
  }

  goToPrevPage() {
    this.router.navigate([], {queryParams: {
      page: Math.max(this.activePage - 1, 1),
    }})
  }
  
  goToNextPage() {
    this.router.navigate([], {queryParams: {
      page: Math.min(this.activePage + 1, TMDB_CATEGORY_MAX_PAGE),
    }})
  }
}
