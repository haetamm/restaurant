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
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-login-page',
  imports: [NgIcon, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login-page.component.html',
  viewProviders: [provideIcons({ bootstrapGoogle })],
})
export class LoginPageComponent {
  loginForm = new FormGroup<LoginFormControls>({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  urlPage = urlPage;
  loginFields = loginFields;

  constructor(
    private authService: AuthService,
    private seoService: SeoService,
  ) {
    setupZodValidation(
      this.loginForm.controls as unknown as Record<string, AbstractControl>,
      loginSchema,
    );
  }

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Login | Restaurant',
      description: 'Explore our awesome app!',
      url: 'https://your-app.com/guest/login',
      keywords: 'login, app, angular',
      image: 'https://your-app.com/assets/default-image.jpg',
    });
  }

  get isLoading(): boolean {
    return this.authService.getLoading();
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
