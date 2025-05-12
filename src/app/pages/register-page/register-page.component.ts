import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { registerSchema } from '../../shared/utils/validation';
import { AuthService } from '../../shared/services/auth.service';
import { registerFields } from '../../shared/utils/fields';
import { urlPage } from '../../shared/utils/constans';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register-page.component.html',
  viewProviders: [provideIcons({ bootstrapGoogle })],
})
export class RegisterPageComponent {
  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  registerFields = registerFields;
  urlPage = urlPage;

  constructor(private authService: AuthService) {
    setupZodValidation(
      this.registerForm.controls as unknown as Record<string, AbstractControl>,
      registerSchema,
    );
  }

  get isLoading(): boolean {
    return this.authService.getLoading();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const result = registerSchema.safeParse(this.registerForm.value);
    if (!result.success) return;

    this.authService.register(result.data);
  }
}
