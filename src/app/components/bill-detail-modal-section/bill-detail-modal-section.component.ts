import {
  CustomerService,
  CustomerTransDetail,
} from './../../shared/services/customer.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { BillDetailCardComponent } from '../bill-detail-card/bill-detail-card.component';
import { bootstrapArrowLeft, bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-bill-detail-modal-section',
  imports: [BillDetailCardComponent, NgIcon, CommonModule],
  templateUrl: './bill-detail-modal-section.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
      bootstrapArrowLeft,
    }),
  ],
})
export class BillDetailModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();
  customerTransDetail: CustomerTransDetail | null = null;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService,
  ) {}
  ngOnInit(): void {
    this.customerTransDetail = this.customerService.getCustomerTransDetail();
  }

  closeModal() {
    this.onClose.emit();
  }

  handleBack(id: string) {
    this.customerService.fetchCustomerTransDetail(id);
    this.modalService.showCustomerDetail();
  }
}
