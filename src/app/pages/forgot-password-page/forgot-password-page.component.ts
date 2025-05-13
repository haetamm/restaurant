import { forgotPasswordFields } from './../../shared/utils/fields';
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
import { SeoService } from '../../shared/services/seo.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, AuthFormComponent],
  templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
  });
  forgotPasswordFields = forgotPasswordFields;

  constructor(
    private authService: AuthService,
    private seoService: SeoService,
  ) {
    setupZodValidation(
      this.forgotPasswordForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      forgotPasswordSchema,
    );
  }

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Forgot Password | Restaurant',
      description: 'Explore our awesome app!',
      url: 'https://your-app.com/guest/forgot-password',
      keywords: 'forgot password, app, angular',
      image: 'https://your-app.com/assets/default-image.jpg',
    });
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
