import {
  formatDate,
  getMenuNames,
  selectPayment,
} from './../../shared/utils/helper';
import { Component, Input, OnInit } from '@angular/core';
import { BillResponse, BillService } from '../../shared/services/bill.service';
import { CommonModule } from '@angular/common';
import { BillCardComponent } from '../bill-card/bill-card.component';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-bill-table',
  standalone: true,
  imports: [CommonModule, BillCardComponent],
  templateUrl: './bill-table.component.html',
})
export class BillTableComponent implements OnInit {
  @Input() isUser: boolean = false;
  coloumns: { name: string }[] = [];
  bills: BillResponse[] = [];
  loading: boolean = false;
  formatDate = formatDate;
  getMenuNames = getMenuNames;
  selectPayment = selectPayment;
  clickedBillId: string | null = null;

  constructor(
    private billService: BillService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.coloumns = [
      { name: this.isUser ? 'TRANSAKSI' : 'CUSTOMER' },
      { name: 'TANGGAL' },
      { name: 'TOTAL BAYAR' },
      { name: 'STATUS' },
      { name: 'ACTION' },
    ];

    this.billService.getState().subscribe((state) => {
      this.bills = state.bills;
      this.loading = state.loading;
    });
  }

  selectBillDetail(id: string) {
    this.clickedBillId = id;
    this.billService.fetchBillById(id);
    this.modalService.showBillDetail();
  }
}
