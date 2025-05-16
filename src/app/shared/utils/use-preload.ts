import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { PLATFORM_ID } from '@angular/core';

export function usePreload(initialLoadingState: boolean) {
  const profileService = inject(ProfileService);
  const platformId = inject(PLATFORM_ID);
  const isLoadingSubject = new BehaviorSubject<boolean>(initialLoadingState);

  async function initialize(): Promise<void> {
    isLoadingSubject.next(initialLoadingState);
    if (isPlatformBrowser(platformId)) {
      try {
        await profileService.fetchProfile();
      } finally {
        isLoadingSubject.next(false);
      }
    } else {
      isLoadingSubject.next(initialLoadingState);
    }
  }

  return {
    isLoading$: isLoadingSubject.asObservable(),
    initialize,
  };
}
