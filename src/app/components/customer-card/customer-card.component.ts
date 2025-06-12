import { Component, Input } from '@angular/core';
import { Customer } from '../../shared/services/customer.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-card',
  imports: [ButtonModule, CommonModule],
  templateUrl: './customer-card.component.html',
})
export class CustomerCardComponent {
  @Input() customer: Customer | null = null;
}
