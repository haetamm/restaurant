import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { forgotPasswordSchema } from '../../shared/utils/validation';
import { AuthService } from '../../shared/services/auth.service';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: '../../layouts/default-layout/default-layout.component.scss',
})
export class ForgotPasswordPageComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
  });

  constructor(private authService: AuthService) {
    setupZodValidation(
      this.forgotPasswordForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      forgotPasswordSchema,
    );
  }

  get isLoading(): boolean {
    return this.authService.getLoading();
  }

  async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const result = forgotPasswordSchema.safeParse(
      this.forgotPasswordForm.value,
    );
    if (!result.success) return;

    await this.authService.forgotPassword(result.data, this.forgotPasswordForm);
  }
}
