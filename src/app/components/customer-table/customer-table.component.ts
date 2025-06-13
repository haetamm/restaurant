import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  Customer,
  CustomerService,
} from '../../shared/services/customer.service';
import { ModalService } from '../../shared/services/modal.service';
import { CustomerCardComponent } from '../customer-card/customer-card.component';

@Component({
  selector: 'app-customer-table',
  imports: [ButtonModule, CommonModule, CustomerCardComponent],
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent {
  customers: Customer[] = [];
  loading: boolean = false;
  coloumns = [
    { name: 'NAMA' },
    { name: 'NO. HP.' },
    { name: 'STATUS' },
    { name: 'ACTION' },
  ];

  constructor(
    private customerService: CustomerService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.customerService.getState().subscribe((state) => {
      this.customers = state.customers;
      this.loading = state.loading;
    });
  }

  handleDetail(id: string) {
    this.customerService.fetchCustomerTransDetail(id);
    this.modalService.showCustomerDetail();
  }

  handleUpdate(id: string) {
    this.customerService.getCustomerById(id);
    this.modalService.showCustomerForm();
  }
}
