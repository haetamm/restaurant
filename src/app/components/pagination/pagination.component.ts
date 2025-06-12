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
  displayedPages: number[] = [];
  showButton: number = 0;

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

  ngOnInit(): void {
    this.showButton = window.innerWidth < 600 ? 3 : 5;
  }

  private updatePagination() {
    if (!this.pagination) {
      this.displayedPages = [];
      return;
    }

    const currentPage = this.pagination.page;
    const totalPages = this.pagination.totalPages;
    const maxPagesToShow = 4;

    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + maxPagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    this.displayedPages = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );
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

  jumpForward() {
    if (!this.pagination) return;
    const newPage = Math.min(
      this.pagination.page + 4,
      this.pagination.totalPages,
    );
    this.changePage(newPage);
  }

  jumpBackward() {
    if (!this.pagination) return;
    const newPage = Math.max(this.pagination.page - 4, 1);
    this.changePage(newPage);
  }
}
