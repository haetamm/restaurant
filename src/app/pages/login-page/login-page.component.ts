import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { AuthService } from '../../shared/services/auth.service';
import { loginFields, LoginFormControls } from '../../shared/utils/fields';
import { loginSchema } from '../../shared/utils/validation';
import { urlPage } from '../../shared/utils/constans';
import { SeoService } from '../../shared/services/seo.service';
import { ButtonGoogleComponent } from '../../components/button-google/button-google.component';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ButtonGoogleComponent,
  ],
  templateUrl: './login-page.component.html',
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
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: ModalService,
  ) {
    setupZodValidation(
      this.loginForm.controls as unknown as Record<string, AbstractControl>,
      loginSchema,
    );
  }

  ngOnInit(): void {
    this.seoService.setMetaTags({
      title: 'Login | Warmakth',
      description: 'Explore our awesome app!',
      url: 'https://your-app.com/guest/login',
      keywords: 'Login, Warmakth, restaurant',
      image: 'https://your-app.com/assets/default-image.jpg',
    });

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('message', async (event) => {
        const data = event.data;
        if (data.googleLoginSuccess && data.token) {
          await this.router.navigate([urlPage.HOME]);
        }
        if (data.googleLoginSuccess && data.tokenAccess) {
          this.authService.setGoogleInfo(data.result);
          this.modalService.showUserGoogleForm();
        }
      });
    }

    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      const scope = params['scope'];

      if (code && scope) {
        const payload = { code: code, scope: scope };
        this.authService.loginWithGoogle(payload);
      }
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
