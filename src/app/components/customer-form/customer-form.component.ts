import { Component, inject } from '@angular/core';
import {
  Customer,
  CustomerService,
  CustomerUpdateRequest,
} from '../../shared/services/customer.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { customerSchema } from '../../shared/utils/validation';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-customer-form',
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule,
    TextareaModule,
    KeyFilterModule,
  ],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent {
  loading: boolean = false;
  customerDetail: Customer | null = null;
  customerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string | null>(null),
  });
  alphaWithSpace: RegExp = /^[a-zA-Z\s]*$/;

  private customerService = inject(CustomerService);

  constructor() {
    setupZodValidation(
      this.customerForm.controls as unknown as Record<string, AbstractControl>,
      customerSchema,
    );
  }

  ngOnInit(): void {
    this.customerDetail = this.customerService.getCustomerDetail();
    if (this.customerDetail) {
      this.customerForm.patchValue({
        name: this.customerDetail.name,
        phoneNumber: this.customerDetail.phoneNumber,
        address: this.customerDetail.address,
      });
    }
  }

  async onSubmit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const result = customerSchema.safeParse(this.customerForm.value);
    if (!result.success) return;

    this.loading = true;
    try {
      if (this.customerDetail) {
        const payload = {
          id: this.customerDetail.id,
          name: this.customerForm.value.name,
          phoneNumber: this.customerForm.value.phoneNumber,
          address: this.customerForm.value.address,
        };
        await this.customerService.updateCustomer(
          payload as CustomerUpdateRequest,
        );
      }
    } finally {
      this.loading = false;
    }
  }
}
