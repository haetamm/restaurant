import { urlPage } from './../../shared/utils/constans';
import { formatDate, openPopup } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getMenuNames } from '../../shared/utils/helper';
import {
  BillService,
  PaymentResponse,
} from '../../shared/services/bill.service';
import { ModalService } from '../../shared/services/modal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bill-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './bill-card.component.html',
})
export class BillCardComponent {
  @Input() isUser: boolean = false;
  selectPayment = openPopup;
  @Input() bill: any;
  formatDate = formatDate;
  getMenuNames = getMenuNames;
  urlPage = urlPage;

  constructor(
    private billService: BillService,
    private modalService: ModalService,
  ) {}

  selectBillDetail(id: string) {
    this.billService.fetchBillById(id);
    this.modalService.showBillDetail();
  }

  updateBill(id: string, payment: PaymentResponse) {
    if (!this.selectPaymentDisabled(payment)) {
      this.billService.updateBillById(id);
    }
  }

  handleSelectPayment(url: string, payment: PaymentResponse) {
    if (!this.selectPaymentDisabled(payment)) {
      this.selectPayment(url);
    }
  }

  selectPaymentDisabled(payment: PaymentResponse): boolean {
    if (!payment || !payment.transactionStatus) {
      return true; // Disable kalo data ga valid
    }
    return (
      payment.transactionStatus === 'expire' ||
      payment.transactionStatus === 'settlement'
    );
  }
}
