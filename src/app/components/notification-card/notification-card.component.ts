import { urlPage } from './../../shared/utils/constans';
import { formatDateTime } from './../../shared/utils/helper';
import { Component, Input } from '@angular/core';
import {
  Notification,
  NotificationService,
} from '../../shared/services/notification.service';
import { ModalService } from '../../shared/services/modal.service';
import { BillService } from '../../shared/services/bill.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './notification-card.component.html',
})
export class NotificationCardComponent {
  @Input() notification!: Notification;

  formatDateTime = formatDateTime;
  urlPage = urlPage;

  constructor(
    private modalService: ModalService,
    private billService: BillService,
    private notificationService: NotificationService,
  ) {}

  onHandleDetail(id: string) {
    this.billService.fetchBillById(id);
    this.modalService.showCustomerBillDetail();
  }

  onHandleUpdate(id: string) {
    if (!this.notification.isRead) {
      this.notificationService.updateByid(id);
    }
  }
}
