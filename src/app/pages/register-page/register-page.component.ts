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
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { registerSchema } from '../../shared/utils/validation';
import { AuthService } from '../../shared/services/auth.service';
import { registerFields } from '../../shared/utils/fields';
import { urlPage } from '../../shared/utils/constans';
import { SeoService } from '../../shared/services/seo.service';
import { ButtonGoogleComponent } from '../../components/button-google/button-google.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ButtonGoogleComponent,
  ],
  templateUrl: './register-page.component.html',
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

  constructor(
    private authService: AuthService,
    private seoService: SeoService,
  ) {
    setupZodValidation(
      this.registerForm.controls as unknown as Record<string, AbstractControl>,
      registerSchema,
    );
  }

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Register | Warmakth',
      description: 'Explore our awesome app!',
      url: 'https://your-app.com/guest/register',
      keywords: 'Register, Warmakth, restaurant',
      image: 'https://your-app.com/assets/default-image.jpg',
    });
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
