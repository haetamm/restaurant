import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { urlPage } from '../shared/utils/constans';
import { usePreload } from '../shared/utils/use-preload';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const preload = usePreload(false);

  if (preload.isAdmin()) {
    return true;
  }

  router.navigate([urlPage.HOME]);
  return false;
};
