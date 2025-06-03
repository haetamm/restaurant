import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonModule } from '@angular/common';
import { Table } from '../../shared/services/table.service';

@Component({
  selector: 'app-cart-admin-form',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
    FloatLabel,
    KeyFilterModule,
    CommonModule,
  ],
  templateUrl: './cart-admin-form.component.html',
})
export class CartAdminFormComponent {
  @Input() tables: Table[] = [];
  @Input() adminCartForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  alphaWithSpace: RegExp = /^[a-zA-Z\s]*$/;

  onSubmit(): void {
    this.formSubmit.emit();
  }
}
