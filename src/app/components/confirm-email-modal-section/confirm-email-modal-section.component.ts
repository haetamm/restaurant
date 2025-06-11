import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileService } from '../../shared/services/profile.service';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { confirmEmailSchema } from '../../shared/utils/validation';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-confirm-email-modal-section',
  imports: [
    ButtonModule,
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    KeyFilterModule,
  ],
  templateUrl: './confirm-email-modal-section.component.html',
})
export class ConfirmEmailModalSectionComponent {
  loading: boolean = false;
  confirmEmailForm = new FormGroup({
    confirmationEmailToken: new FormControl<string>('', [Validators.required]),
  });

  private profileService = inject(ProfileService);
  constructor() {
    setupZodValidation(
      this.confirmEmailForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      confirmEmailSchema,
    );
  }

  async onSubmit() {
    if (this.confirmEmailForm.invalid) {
      this.confirmEmailForm.markAllAsTouched();
      return;
    }

    const result = confirmEmailSchema.safeParse(this.confirmEmailForm.value);
    if (!result.success) return;
    this.loading = true;
    try {
      await this.profileService.confirmProfileEmail(result.data);
    } finally {
      this.loading = false;
    }
  }
}
