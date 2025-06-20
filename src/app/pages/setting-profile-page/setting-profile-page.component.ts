import { Component, inject } from '@angular/core';
import { Profile, ProfileService } from '../../shared/services/profile.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
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
import { SeoService } from '../../shared/services/seo.service';

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
  loading: boolean = false;
  profileForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
  });

  private profileService = inject(ProfileService);
  private seoService = inject(SeoService);
  constructor() {
    setupZodValidation(
      this.profileForm.controls as unknown as Record<string, AbstractControl>,
      profileSchema,
    );
  }

  ngOnInit(): void {
    if (this.seoService) {
      this.seoService.setMetaTags({
        title: 'Profile | Warmakth',
        description: 'Explore our awesome app!',
        url: '-',
        keywords: '-',
        image: 'https://your-app.com/assets/default-image.jpg',
      });
    }

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

  async onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const result = profileSchema.safeParse(this.profileForm.value);
    if (!result.success) return;
    this.loading = true;
    await this.profileService.updateProfile(result.data);
    this.loading = false;
  }

  get displayName(): string {
    if (this.profile) {
      return this.profile.name || this.profile.username;
    }
    return 'Hello';
  }
}
