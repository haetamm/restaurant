import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() formGroup!: FormGroup;
  @Input() fields: { name: string; type: string; label: string }[] = [];
  @Input() buttonLabel: string = 'Submit';
  @Input() isLoading: boolean = false;

  @Output() submitForm = new EventEmitter<void>();

  onSubmit() {
    if (this.formGroup.valid) {
      this.submitForm.emit();
    }
  }
}
