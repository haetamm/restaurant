import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { BillService } from '../../shared/services/bill.service';
import { BillTableComponent } from '../../components/bill-table/bill-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { BillFilterbarComponent } from '../../components/bill-filterbar/bill-filterbar.component';
import { usePreload } from '../../shared/utils/use-preload';
import { BillDetailCardComponent } from '../../components/bill-detail-card/bill-detail-card.component';
import { PaginationResponse } from '../../shared/utils/types';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-transaction-page',
  imports: [
    PaginationComponent,
    BillTableComponent,
    SearchbarComponent,
    BillFilterbarComponent,
    BillDetailCardComponent,
  ],
  templateUrl: './transaction-page.component.html',
})
export class TransactionPageComponent implements OnInit {
  billPagination: PaginationResponse | null = null;
  initialSearch: string = '';
  private readonly preload = usePreload(false);

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
  ) {}

  get isUser() {
    return this.preload.isUser();
  }

  get placeholder(): string {
    return this.isUser ? 'Search your food' : 'Search customer';
  }

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Transaction | Warmakth',
        description: 'Explore our awesome app!',
        url: 'https://your-app.com/home',
        keywords: 'transaction, warmakth, restaurant',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }

    // Subscribe ke perubahan pagination
    this.billService.pagination$.subscribe((pagination) => {
      this.billPagination = pagination;
    });

    // Ambil query parameter dari URL saat ini
    const queryParams = this.route.snapshot.queryParams;

    // Set initialSearch berdasarkan menuName atau customer dari queryParams (jika ada)
    this.initialSearch = this.isUser
      ? queryParams['menuName'] || ''
      : queryParams['customerName'] || '';

    // Panggil fetchBillByCurrentUser dengan query parameter
    this.billService.fetchBillByCurrentUser(queryParams);
  }

  fetchBillByCurrentUser(queryParams: any) {
    this.billService.fetchBillByCurrentUser(queryParams);
  }

  onSearch(searchTerm: string) {
    const trimmedSearch = searchTerm.trim();

    const queryParams = {
      ...this.route.snapshot.queryParams,
      page: 1,
      ...(this.isUser
        ? { menuName: trimmedSearch || '' }
        : { customerName: trimmedSearch || '' }),
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
