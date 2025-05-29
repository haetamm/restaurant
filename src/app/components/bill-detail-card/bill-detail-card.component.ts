import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillResponse, BillService } from '../../shared/services/bill.service';

@Component({
  selector: 'app-bill-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-detail-card.component.html',
})
export class BillDetailCardComponent implements OnInit {
  billDetail: BillResponse | null = null;
  loadingDetail: boolean = false;

  constructor(private billService: BillService) {}

  ngOnInit() {
    this.billService.getState().subscribe((state) => {
      this.billDetail = state.billDetail;
      this.loadingDetail = state.loadingDetail;
    });
  }
}
