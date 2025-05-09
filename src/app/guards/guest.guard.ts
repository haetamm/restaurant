import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { urlPage } from '../shared/utils/constans';

export const guestGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  // Jika profile belum dimuat, coba setProfile()
  if (!profileService.getProfile()) {
    await profileService.setProfile();
  }

  const profile = profileService.getProfile();
  return profile ? router.createUrlTree([urlPage.HOME]) : true;
};
