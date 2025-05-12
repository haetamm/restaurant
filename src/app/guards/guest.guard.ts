import { authApi } from './../shared/api/auth.api';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { urlPage } from '../shared/utils/constans';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const guestGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const profileService = inject(ProfileService);
  const router = inject(Router);
  const cookieService = inject(SsrCookieService);
  const platformId = inject(PLATFORM_ID);

  const api = authApi(cookieService, platformId);
  const token = api.getAccessToken();

  if (!profileService.getProfile()) {
    profileService.fetchProfile();
  }

  const profile = profileService.getProfile();
  return profile || token ? router.createUrlTree([urlPage.HOME]) : true;
};
