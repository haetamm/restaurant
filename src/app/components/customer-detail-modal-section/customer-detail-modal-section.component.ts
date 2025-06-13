import {
  MODAL_TYPES,
  ModalService,
} from './../../shared/services/modal.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CustomerService,
  CustomerTransDetail,
} from '../../shared/services/customer.service';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { ButtonModule } from 'primeng/button';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../shared/utils/helper';
import { BillService } from '../../shared/services/bill.service';

@Component({
  selector: 'app-customer-detail-modal-section',
  imports: [
    CustomerCardComponent,
    ButtonModule,
    CustomerFormComponent,
    CommonModule,
  ],
  templateUrl: './customer-detail-modal-section.component.html',
})
export class CustomerDetailModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();
  @Input() type: string = '';
  MODAL_TYPES = MODAL_TYPES;
  customerTransDetail: CustomerTransDetail | null = null;
  loading: boolean = false;
  formatDate = formatDate;

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService,
    private billService: BillService,
  ) {}

  ngOnInit(): void {
    this.customerService.getState().subscribe((state) => {
      this.customerTransDetail = state.customerTransDetail;
      this.loading = state.loadingDetail;
    });
  }

  closeModal() {
    this.onClose.emit();
    this.customerService.resetCustomerTransDetail();
  }

  selectBillDetail(id: string) {
    this.billService.fetchBillById(id);
    this.modalService.showCustomerBillDetail();
  }
}
