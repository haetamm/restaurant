import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { emailChangeSchema } from '../../shared/utils/validation';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-email-change-form',
  imports: [
    ButtonModule,
    FloatLabel,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './email-change-form.component.html',
  styleUrl: './email-change-form.component.scss',
})
export class EmailChangeFormComponent {
  profile: Profile | null = null;
  emailChangeForm = new FormGroup({
    newEmail: new FormControl<string>('', [Validators.required]),
    passwordConfirmation: new FormControl<string>('', [Validators.required]),
  });
  loading: boolean = false;

  private profileService = inject(ProfileService);
  constructor() {
    setupZodValidation(
      this.emailChangeForm.controls as unknown as Record<
        string,
        AbstractControl
      >,
      emailChangeSchema,
    );
  }

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
    if (this.profile) {
      this.emailChangeForm.patchValue({
        newEmail: this.profile.email,
      });
    }
  }

  async onSubmit() {
    if (this.emailChangeForm.invalid) {
      this.emailChangeForm.markAllAsTouched();
      return;
    }

    const result = emailChangeSchema.safeParse(this.emailChangeForm.value);
    if (!result.success) return;
    this.loading = true;
    try {
      await this.profileService.updateProfileEmail(result.data);
      this.emailChangeForm.patchValue({
        passwordConfirmation: '',
      });
    } catch (err) {
      console.error('[Submit Error]', err);
    } finally {
      this.loading = false;
    }
  }
}
