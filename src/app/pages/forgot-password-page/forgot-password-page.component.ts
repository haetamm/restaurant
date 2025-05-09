import { Component, OnInit, inject } from '@angular/core';
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
import { Observable, of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: '../../layouts/default-layout/default-layout.component.scss',
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
  });
  state$!: Observable<{ loading: boolean }>;

  private authService = inject(AuthService);

  constructor() {
    setupZodValidation(
      this.forgotPasswordForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      forgotPasswordSchema,
    );
  }

  ngOnInit() {
    if (this.authService) {
      this.state$ = this.authService.getState();
    } else {
      this.state$ = of({ token: null, loading: false });
    }
  }

  async onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const result = forgotPasswordSchema.safeParse(
      this.forgotPasswordForm.value,
    );
    if (!result.success) return;

    this.authService.forgotPassword(result.data, this.forgotPasswordForm);
  }
}
