import { urlPage } from './../../shared/utils/constans';
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
import { InputTextModule } from 'primeng/inputtext';
import { ProfileService } from '../../shared/services/profile.service';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { passwordChangeSchema } from '../../shared/utils/validation';
import { FloatLabel } from 'primeng/floatlabel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-change-form',
  imports: [
    ButtonModule,
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.scss',
})
export class PasswordChangeFormComponent {
  passwordChangeForm = new FormGroup({
    password: new FormControl<string>('', [Validators.required]),
    repeatPassword: new FormControl<string>('', [Validators.required]),
    passwordConfirmation: new FormControl<string>('', [Validators.required]),
  });
  loading: boolean = false;
  urlPage = urlPage;

  private profileService = inject(ProfileService);

  constructor() {
    setupZodValidation(
      this.passwordChangeForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      passwordChangeSchema,
    );
  }

  async onSubmit() {
    if (this.passwordChangeForm.invalid) {
      this.passwordChangeForm.markAllAsTouched();
      return;
    }

    const result = passwordChangeSchema.safeParse(
      this.passwordChangeForm.value,
    );
    if (!result.success) return;
    this.loading = true;

    try {
      await this.profileService.updateProfilePassword(result.data);
      this.passwordChangeForm.reset();
    } catch (err) {
      console.error('error');
    } finally {
      this.loading = false;
    }
  }
}
