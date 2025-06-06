import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { urlPage } from '../shared/utils/constans';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const mobileGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);
  const isSmallScreen = isBrowser ? window.innerWidth < 1024 : false;

  if (isSmallScreen) {
    return true;
  }

  router.navigate([urlPage.HOME]);
  return false;
};
