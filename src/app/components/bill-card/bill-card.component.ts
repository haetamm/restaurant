import { urlPage } from './../../shared/utils/constans';
import { selectPayment, formatDate } from './../../shared/utils/helper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getMenuNames } from '../../shared/utils/helper';
import { BillService } from '../../shared/services/bill.service';
import { ModalService } from '../../shared/services/modal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bill-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './bill-card.component.html',
})
export class BillCardComponent {
  @Input() isUser: boolean = false;
  selectPayment = selectPayment;
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
}
