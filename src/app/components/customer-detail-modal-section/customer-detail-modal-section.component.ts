import { Component, EventEmitter, Output } from '@angular/core';
import {
  Customer,
  CustomerService,
} from '../../shared/services/customer.service';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-customer-detail-modal-section',
  imports: [CustomerCardComponent, ButtonModule],
  templateUrl: './customer-detail-modal-section.component.html',
})
export class CustomerDetailModalSectionComponent {
  customerDetail: Customer | null = null;
  @Output() onClose = new EventEmitter<void>();

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerDetail = this.customerService.getCustomerDetail();
  }

  closeModal() {
    this.onClose.emit();
  }
}
