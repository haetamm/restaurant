import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { urlPage } from '../shared/utils/constans';

export const authGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  let profile = profileService.getProfile();

  if (!profile) {
    try {
      await profileService.fetchProfile();
      profile = profileService.getProfile();
    } catch (error) {
      return router.createUrlTree([urlPage.WELCOME]);
    }
  }

  return profile ? true : router.createUrlTree([urlPage.WELCOME]);
};
