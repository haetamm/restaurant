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
import { AuthService } from '../../shared/services/auth.service';
import { loginFields, LoginFormControls } from '../../shared/utils/fields';
import { loginSchema } from '../../shared/utils/validation';
import { urlPage } from '../../shared/utils/constans';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [NgIcon, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  viewProviders: [provideIcons({ bootstrapGoogle })],
})
export class LoginPageComponent {
  loginForm = new FormGroup<LoginFormControls>({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  urlPage = urlPage;
  loginFields = loginFields;
  state$: Observable<{
    token: string | null;
    loading: boolean;
  }>;

  constructor(private authService: AuthService) {
    this.state$ = this.authService.getState();
    setupZodValidation(
      this.loginForm.controls as unknown as Record<string, AbstractControl>,
      loginSchema,
    );
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const result = loginSchema.safeParse(this.loginForm.value);
    if (!result.success) return;

    this.authService.login(result.data);
  }
}
