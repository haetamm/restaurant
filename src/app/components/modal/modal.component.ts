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
import { UserModalSectionComponent } from '../user-modal-section/user-modal-section.component';
import { User, UserService } from '../../shared/services/user.service';
import { Admin, AdminService } from '../../shared/services/admin.service';
import { AdminModalSectionComponent } from '../admin-modal-section/admin-modal-section.component';
import { UserGoogleFormModalSectionComponent } from '../user-google-form-modal-section/user-google-form-modal-section.component';

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
    UserModalSectionComponent,
    AdminModalSectionComponent,
    UserGoogleFormModalSectionComponent,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  modalState$!: Observable<{
    isVisible: boolean;
    type: string;
    callback: (() => void) | null;
  }>;
  user: User | null = null;
  admin: Admin | null = null;

  MODAL_TYPES = MODAL_TYPES;

  constructor(
    private modalService: ModalService,
    private profileService: ProfileService,
    private billService: BillService,
    private userService: UserService,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.modalState$ = this.modalService.getModalState();
    this.userService.getState().subscribe((state) => {
      this.user = state.userDetail;
    });
    this.adminService.getState().subscribe((state) => {
      this.admin = state.adminDetail;
    });
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

  getModalButtonLabel(): string {
    if (this.user?.isEnable !== undefined) {
      return this.user.isEnable ? 'Inactivate' : 'Activate';
    } else if (this.admin?.isEnable !== undefined) {
      return this.admin.isEnable ? 'Inactivate' : 'Activate';
    }
    return '';
  }
}
