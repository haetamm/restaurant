import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Profile } from '../../shared/services/profile.service';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { resetPasswordSchema } from '../../shared/utils/validation';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-password-change-form',
  imports: [
    ButtonModule,
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.scss',
})
export class PasswordChangeFormComponent {
  profile: Profile | null = null;
  passwordChangeForm = new FormGroup({
    password: new FormControl<string>('', [Validators.required]),
    passwordConfirmation: new FormControl<string>('', [Validators.required]),
  });
  loading: boolean = false;

  constructor() {
    setupZodValidation(
      this.passwordChangeForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      resetPasswordSchema,
    );
  }

  ngOnInit(): void {}

  async onSubmit(formValue?: any) {
    if (this.passwordChangeForm.invalid) {
      this.passwordChangeForm.markAllAsTouched();
      return;
    }

    const { data } = resetPasswordSchema.safeParse(
      formValue || this.passwordChangeForm.value,
    );

    if (!data) return;
    this.loading = true;
    console.log(data);
    this.loading = false;
  }
}
