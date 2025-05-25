import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bill-form.component.html',
})
export class BillFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() fields: { name: string; type: string; label: string }[] = [];

  @Output() submitForm = new EventEmitter<any>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit(this.formGroup.value);
    }
  }
}
