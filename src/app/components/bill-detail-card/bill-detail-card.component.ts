import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillResponse, BillService } from '../../shared/services/bill.service';
import { Subscription } from 'rxjs';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-bill-detail-card',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './bill-detail-card.component.html',
})
export class BillDetailCardComponent implements OnInit, OnDestroy {
  billDetail: BillResponse | null = null;
  loadingDetail: boolean = false;

  private subscription: Subscription | null = null;

  constructor(private billService: BillService) {}

  ngOnInit() {
    this.billService.getState().subscribe((state) => {
      this.billDetail = state.billDetail;
      this.loadingDetail = state.loadingDetail;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
