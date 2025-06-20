import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { bootstrapXLg } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AuthService, GoogleInfo } from '../../shared/services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { registerUserGoogleSchema } from '../../shared/utils/validation';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-user-google-form-modal-section',
  imports: [
    NgIcon,
    CommonModule,
    ReactiveFormsModule,
    FloatLabel,
    InputTextModule,
    ButtonModule,
    KeyFilterModule,
  ],
  templateUrl: './user-google-form-modal-section.component.html',
  viewProviders: [
    provideIcons({
      bootstrapXLg,
    }),
  ],
})
export class UserGoogleFormModalSectionComponent {
  @Output() onClose = new EventEmitter<void>();
  loading: boolean = false;
  googleInfo: GoogleInfo | null = null;
  userGoogleForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', []),
  });
  alphaWithSpace: RegExp = /^[a-zA-Z\s]*$/;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {
    setupZodValidation(
      this.userGoogleForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      registerUserGoogleSchema,
    );
  }

  ngOnInit(): void {
    this.authService.getState().subscribe((state) => {
      this.googleInfo = state.googleInfo;

      if (this.googleInfo) {
        this.userGoogleForm.patchValue({
          name: this.googleInfo.name,
          username: this.googleInfo.username,
          email: this.googleInfo.email,
        });
      }
      this.cdr.detectChanges();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.userGoogleForm.invalid) {
      this.userGoogleForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      if (this.googleInfo) {
        const payload = {
          name: this.userGoogleForm.value.name,
          username: this.userGoogleForm.value.username,
          email: this.userGoogleForm.value.email,
          phone: this.userGoogleForm.value.phone,
          password: this.userGoogleForm.value.password,
          tokenAccess: this.googleInfo.tokenAccess,
        };
        await this.authService.registerUserGoogle(payload as GoogleInfo);
      }
    } catch (err) {
      console.error('[Submit Error]', err);
    } finally {
      this.loading = false;
    }
  }

  closeModal() {
    this.onClose.emit();
  }
}
