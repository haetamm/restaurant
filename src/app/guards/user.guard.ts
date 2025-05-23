import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { usePreload } from '../shared/utils/use-preload';
import { urlPage } from '../shared/utils/constans';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const userGuard: CanActivateFn = () => {
  const { isUser } = usePreload(false);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);
  const isSmallScreen = isBrowser ? window.innerWidth < 768 : false;

  if (isUser() && isSmallScreen) {
    return true;
  }

  router.navigate([urlPage.WELCOME]);
  return false;
};
