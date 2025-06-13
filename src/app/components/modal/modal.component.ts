import { MODAL_TYPES } from './../../shared/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { CheckoutSectionComponent } from '../checkout-section/checkout-section.component';
import { Observable } from 'rxjs';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { ModalSmallComponent } from '../modal-small/modal-small.component';
import { ProfileService } from '../../shared/services/profile.service';
import { BillDetailModalSectionComponent } from '../bill-detail-modal-section/bill-detail-modal-section.component';
import { MenuFormModalSectionComponent } from '../menu-form-modal-section/menu-form-modal-section.component';
import { ConfirmEmailModalSectionComponent } from '../confirm-email-modal-section/confirm-email-modal-section.component';
import { CustomerDetailModalSectionComponent } from '../customer-detail-modal-section/customer-detail-modal-section.component';
import { BillService } from '../../shared/services/bill.service';

@Component({
  selector: 'app-modal',
  imports: [
    CheckoutSectionComponent,
    CommonModule,
    ModalSmallComponent,
    BillDetailModalSectionComponent,
    MenuFormModalSectionComponent,
    ConfirmEmailModalSectionComponent,
    CustomerDetailModalSectionComponent,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  modalState$!: Observable<{
    isVisible: boolean;
    type: string;
    callback: (() => void) | null;
  }>;

  MODAL_TYPES = MODAL_TYPES;

  constructor(
    private modalService: ModalService,
    private profileService: ProfileService,
    private billService: BillService,
  ) {}

  ngOnInit(): void {
    this.modalState$ = this.modalService.getModalState();
  }

  closeModal(): void {
    this.modalService.hideModal();
    this.billService.resetBillDetail();
  }

  async executeCallback(): Promise<void> {
    await this.modalService.executeCallback();
  }

  handleLogout() {
    this.profileService.logout();
  }
}
