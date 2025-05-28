import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BillService } from '../../shared/services/bill.service';
import { ButtonModule } from 'primeng/button';

interface SelectType {
  name: string;
  value: string;
}

@Component({
  selector: 'app-bill-filterbar',
  standalone: true,
  imports: [DatePickerModule, FormsModule, Select, ButtonModule],
  templateUrl: './bill-filterbar.component.html',
  styleUrls: ['./bill-filterbar.component.scss'],
})
export class BillFilterbarComponent implements OnInit {
  from: Date | undefined;
  to: Date | undefined;
  transType: SelectType[] | undefined;
  transactionStatus: SelectType[] | undefined;
  selectedTransType: SelectType | undefined;
  selectedTransactionStatus: SelectType | undefined;
  private queryParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billService: BillService,
  ) {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        console.log('Query Params:', params); // Debugging
        const transTypeValue = params['transType'] || undefined;
        const statusValue = params['transactionStatus'] || undefined;
        const fromValue = params['from'] || undefined;
        const toValue = params['to'] || undefined;

        this.selectedTransType = this.transType?.find(
          (type) => type.value === transTypeValue,
        );
        this.selectedTransactionStatus = this.transactionStatus?.find(
          (stat) => stat.value === statusValue,
        );
        this.from = fromValue ? new Date(fromValue) : undefined;
        this.to = toValue ? new Date(toValue) : undefined;
      },
    );
  }

  ngOnInit() {
    this.transType = [
      { name: 'Reset', value: '' },
      { name: 'Dine In', value: 'DI' },
      { name: 'Delivery', value: 'D' },
    ];

    this.transactionStatus = [
      { name: 'Reset', value: '' },
      { name: 'Ordered', value: 'ordered' },
      { name: 'Pending', value: 'pending' },
    ];

    // Initialize values from URL
    const transTypeValue = this.route.snapshot.queryParams['transType'];
    const statusValue = this.route.snapshot.queryParams['transactionStatus'];
    const fromValue = this.route.snapshot.queryParams['from'];
    const toValue = this.route.snapshot.queryParams['to'];

    this.selectedTransType = this.transType.find(
      (type) => type.value === transTypeValue,
    );
    this.selectedTransactionStatus = this.transactionStatus.find(
      (stat) => stat.value === statusValue,
    );
    this.from = fromValue ? new Date(fromValue) : undefined;
    this.to = toValue ? new Date(toValue) : undefined;
  }

  // Format date to YYYY-MM-DD in local timezone (WIB)
  private formatDate(date: Date | undefined): string | undefined {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Update URL and fetch data
  private updateFiltersAndNavigate(params: { [key: string]: any }): void {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      ...params,
      page: 1,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        const filters = {
          ...queryParams,
        };
        this.billService.fetchBillByCurrentUser(filters);
      });
  }

  selectTransType(transType: SelectType | null): void {
    if (!transType) return;
    this.selectedTransType = transType;
    this.updateFiltersAndNavigate({ transType: transType.value });
  }

  selectStatus(status: SelectType | null): void {
    if (!status) return;
    this.selectedTransactionStatus = status;
    this.updateFiltersAndNavigate({ transactionStatus: status.value });
  }

  selectFrom(date: Date): void {
    this.from = date;
    this.updateFiltersAndNavigate({ from: this.formatDate(date) });
  }

  selectTo(date: Date): void {
    this.to = date;
    this.updateFiltersAndNavigate({ to: this.formatDate(date) });
  }

  reset(): void {
    this.from = undefined;
    this.to = undefined;
    this.updateFiltersAndNavigate({ from: undefined, to: undefined });
  }
}
