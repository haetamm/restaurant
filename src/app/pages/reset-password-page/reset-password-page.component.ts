import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { resetPasswordSchema } from '../../shared/utils/validation';
import { AuthService } from '../../shared/services/auth.service';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { NotfoundPageComponent } from '../notfound-page/notfound-page.component';
import { resetPasswordFields } from '../../shared/utils/fields';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NotfoundPageComponent,
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: '../../layouts/default-layout/default-layout.component.scss',
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    password: new FormControl<string>('', [Validators.required]),
    passwordConfirmation: new FormControl<string>('', [Validators.required]),
  });
  resetPasswordFields = resetPasswordFields;
  token: string | null = null;

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  constructor() {
    setupZodValidation(
      this.resetPasswordForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      resetPasswordSchema,
    );
  }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.token = params['token'] || null;
    });
  }

  get isLoading(): boolean {
    return this.authService.getLoading();
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const result = resetPasswordSchema.safeParse(this.resetPasswordForm.value);
    if (!result.success) {
      return;
    }

    const token = this.token;
    if (token) {
      this.authService.resetPassword(result.data, token);
    }
  }
}
