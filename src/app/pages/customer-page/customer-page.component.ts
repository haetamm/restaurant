import { Component, inject } from '@angular/core';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer.service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  bootstrapSortAlphaDown,
  bootstrapSortAlphaDownAlt,
} from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationResponse } from '../../shared/utils/types';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [
    NgIcon,
    SearchbarComponent,
    CommonModule,
    ButtonModule,
    CustomerTableComponent,
    PaginationComponent,
  ],
  templateUrl: './customer-page.component.html',
  viewProviders: [
    provideIcons({
      bootstrapSortAlphaDown,
      bootstrapSortAlphaDownAlt,
    }),
  ],
})
export class CustomerPageComponent {
  initialSearch: string = '';
  customerPagination: PaginationResponse | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.customerService.pagination$.subscribe((pagination) => {
      this.customerPagination = pagination;
    });

    const queryParams = this.route.snapshot.queryParams;
    queryParams['name'] || '';
    this.initialSearch = queryParams['name'] || '';

    const customers = this.customerService.getCustomers();
    if (customers.length < 10 || this.initialSearch !== '') {
      this.customerService.fetchCustomers(queryParams);
    }
  }

  onSearch(searchTerm: string) {
    const trimmedSearch = searchTerm.trim();
    const queryParams = {
      ...this.route.snapshot.queryParams,
      page: 1,
      name: trimmedSearch || '',
    };

    this.navigateWithParams(queryParams);
  }

  onSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    const queryParams = {
      ...this.route.snapshot.queryParams,
      page: 1,
      direction: this.sortDirection,
    };

    this.navigateWithParams(queryParams);
  }

  fetchCustomers(queryParams: any) {
    this.customerService.fetchCustomers(queryParams);
  }

  private navigateWithParams(queryParams: any) {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.customerService.fetchCustomers(queryParams);
      })
      .catch((error) => {
        console.error('Navigation error:', error);
      });
  }
}
