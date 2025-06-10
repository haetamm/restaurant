import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import {
  AbstractControl,
  FormBuilder,
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
  emailChangeForm: FormGroup;
  loading: boolean = false;

  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder);
  constructor() {
    this.emailChangeForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

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
        email: this.profile.email,
      });
    }
  }

  async onSubmit(formValue?: any) {
    if (this.emailChangeForm.invalid) {
      this.emailChangeForm.markAllAsTouched();
      return;
    }

    const { data } = emailChangeSchema.safeParse(
      formValue || this.emailChangeForm.value,
    );

    if (!data) return;
    this.loading = true;
    console.log(data);
    this.loading = false;
  }
}
