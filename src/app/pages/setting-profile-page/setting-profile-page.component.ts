import { Component, inject } from '@angular/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { setupZodValidation } from '../../shared/utils/zod-validation.helper';
import { profileSchema } from '../../shared/utils/validation';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-setting-profile-page',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule,
    TextareaModule,
  ],
  templateUrl: './setting-profile-page.component.html',
})
export class SettingProfilePageComponent {
  profile: Profile | null = null;
  profileForm: FormGroup;
  loading: boolean = false;

  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder);
  constructor() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });

    setupZodValidation(
      this.profileForm.controls as unknown as Record<string, AbstractControl>,
      profileSchema,
    );
  }

  ngOnInit(): void {
    this.profile = this.profileService.getProfile();
    if (this.profile) {
      this.profileForm.patchValue({
        name: this.profile.name,
        phone: this.profile.phone,
        address: this.profile.address,
        username: this.profile.username,
      });
    }
  }

  async onSubmit(formValue?: any) {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { data } = profileSchema.safeParse(
      formValue || this.profileForm.value,
    );

    if (!data) return;
    this.loading = true;
    console.log(data);
    this.loading = false;
  }

  get displayName(): string {
    if (this.profile) {
      return this.profile.name || this.profile.username;
    }
    return 'Hello';
  }
}
