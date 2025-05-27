import { formatDate } from './../../shared/utils/helper';
import { Component, OnInit } from '@angular/core';
import { BillResponse, BillService } from '../../shared/services/bill.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill-table',
  imports: [CommonModule],
  templateUrl: './bill-table.component.html',
})
export class BillTableComponent implements OnInit {
  bills: BillResponse[] = [];
  loading: boolean = false;
  formatDate = formatDate;

  constructor(private billService: BillService) {}

  coloumns = [
    { name: 'PELANGGAN' },
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
