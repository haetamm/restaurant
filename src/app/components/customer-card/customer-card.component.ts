import { Component, Input } from '@angular/core';
import {
  Customer,
  CustomerTransDetail,
} from '../../shared/services/customer.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-card',
  imports: [ButtonModule, CommonModule],
  templateUrl: './customer-card.component.html',
})
export class CustomerCardComponent {
  @Input() customer: Customer | CustomerTransDetail | null = null;
  @Input() showButton: boolean = false;
  @Input() onDetail!: (id: string) => void;
  @Input() onUpdate!: (id: string) => void;

  updateCustomer() {
    if (!this.customer?.member && this.customer?.id) {
      this.onUpdate(this.customer.id);
    }
  }
}
