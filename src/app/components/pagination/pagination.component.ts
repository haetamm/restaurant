import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse } from '../../shared/services/menu.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  pagination: PaginationResponse | null = null;
  pages: number[] = [];

  @Input() fetchData: (queryParams: any) => void = () => {};
  @Output() pageChange = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  @Input() set paginationData(pagination: PaginationResponse | null) {
    this.pagination = pagination;
    this.updatePagination();
  }

  private updatePagination() {
    if (this.pagination) {
      this.pages = Array.from(
        { length: this.pagination.totalPages },
        (_, i) => i + 1,
      );
    } else {
      this.pages = [];
    }
  }

  changePage(page: number) {
    if (
      !this.pagination ||
      page < 1 ||
      page > this.pagination.totalPages ||
      page === this.pagination.page
    ) {
      return;
    }

    this.pageChange.emit(page);

    const queryParams = {
      ...this.route.snapshot.queryParams,
      page,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.fetchData(queryParams);
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }

  previousPage() {
    if (this.pagination && this.pagination.hasPrevious) {
      this.changePage(this.pagination.page - 1);
    }
  }

  nextPage() {
    if (this.pagination && this.pagination.hasNext) {
      this.changePage(this.pagination.page + 1);
    }
  }
}
