import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { BillService } from '../../shared/services/bill.service';
import { BillTableComponent } from '../../components/bill-table/bill-table.component';
import { PaginationResponse } from '../../shared/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-transaction-page',
  imports: [PaginationComponent, BillTableComponent, SearchbarComponent],
  templateUrl: './transaction-page.component.html',
})
export class TransactionPageComponent implements OnInit {
  billPagination: PaginationResponse | null = null;
  initialSearch: string = '';

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe ke perubahan pagination
    this.billService.pagination$.subscribe((pagination) => {
      this.billPagination = pagination;
    });

    // Ambil query parameter dari URL saat ini
    const queryParams = this.route.snapshot.queryParams;

    // Set initialSearch berdasarkan menuName dari queryParams (jika ada)
    this.initialSearch = queryParams['menuName'] || '';

    // Panggil fetchBillByCurrentUser dengan query parameter
    this.billService.fetchBillByCurrentUser(queryParams);
  }

  fetchBillByCurrentUser(queryParams: any) {
    this.billService.fetchBillByCurrentUser(queryParams);
  }

  onSearch(searchTerm: string) {
    const trimmedSearch = searchTerm.trim();
    const queryParams = {
      ...this.route.snapshot.queryParams, // Pertahankan parameter lain
      menuName: trimmedSearch || '',
      page: 1, // Reset ke halaman 1
    };

    // Navigasi ke URL dengan query parameter baru
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // Gabungkan dengan parameter lain
      })
      .then(() => {
        this.billService.fetchBillByCurrentUser(queryParams);
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }
}
