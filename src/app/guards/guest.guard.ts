import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { urlPage } from '../shared/utils/constans';
import { authApi } from '../shared/api/auth.api';

export const guestGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  const token = authApi.getAccessToken();

  if (!token) {
    return true;
  }

  let profile = profileService.getProfile();
  if (!profile) {
    try {
      await profileService.fetchProfile();
      profile = profileService.getProfile();
    } catch (error) {
      console.error('Gagal ambil profil:', error);
      return true;
    }
  }

  return profile ? router.createUrlTree([urlPage.WELCOME]) : true;
};
