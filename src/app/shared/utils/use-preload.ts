import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { PLATFORM_ID } from '@angular/core';

export function usePreload(initialLoadingState: boolean) {
  const profileService = inject(ProfileService);
  const platformId = inject(PLATFORM_ID);
  const isLoadingSubject = new BehaviorSubject<boolean>(initialLoadingState);

  // role checker helpers
  function getRoles(): string[] {
    const profile = profileService.getProfile();
    return profile?.roles ?? [];
  }

  function isUser(): boolean {
    const roles = getRoles();
    return roles.length === 1 && roles.includes('ROLE_USER');
  }

  function isAdmin(): boolean {
    const roles = getRoles();
    return roles.length > 1 && roles.includes('ROLE_ADMIN');
  }

  function isSuperAdmin(): boolean {
    const roles = getRoles();
    return (
      roles.length === 3 &&
      roles.includes('ROLE_USER') &&
      roles.includes('ROLE_ADMIN') &&
      roles.includes('ROLE_SUPER_ADMIN')
    );
  }

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
    isUser,
    isAdmin,
    isSuperAdmin,
  };
}
