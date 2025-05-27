import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { BillService } from '../../shared/services/bill.service';
import { BillTableComponent } from '../../components/bill-table/bill-table.component';
import { PaginationResponse } from '../../shared/services/menu.service';

@Component({
  selector: 'app-transaction-page',
  imports: [PaginationComponent, BillTableComponent],
  templateUrl: './transaction-page.component.html',
})
export class TransactionPageComponent implements OnInit {
  billPagination: PaginationResponse | null = null;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.pagination$.subscribe((pagination) => {
      this.billPagination = pagination;
    });

    this.billService.fetchBillByCurrentUser();
  }

  fetchBillByCurrentUser(queryParams: any) {
    this.billService.fetchBillByCurrentUser(queryParams);
  }
}
