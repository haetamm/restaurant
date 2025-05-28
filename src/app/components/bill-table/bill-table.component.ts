import { formatDate, getMenuNames } from './../../shared/utils/helper';
import { Component, OnInit } from '@angular/core';
import { BillResponse, BillService } from '../../shared/services/bill.service';
import { CommonModule } from '@angular/common';
import { CardBillComponent } from '../card-bill/card-bill.component';

@Component({
  selector: 'app-bill-table',
  imports: [CommonModule, CardBillComponent],
  templateUrl: './bill-table.component.html',
})
export class BillTableComponent implements OnInit {
  bills: BillResponse[] = [];
  loading: boolean = false;
  formatDate = formatDate;
  getMenuNames = getMenuNames;

  constructor(private billService: BillService) {}

  coloumns = [
    { name: 'TRANSAKSI' },
    { name: 'TANGGAL' },
    { name: 'TOTAL BAYAR' },
    { name: 'STATUS' },
    { name: 'ACTION' },
  ];

  ngOnInit() {
    this.billService.getState().subscribe((state) => {
      this.bills = state.bills;
      this.loading = state.loading;
    });
  }
}
