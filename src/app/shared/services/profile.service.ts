import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { authApi } from '../api/auth.api';
import { TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { UserApi } from '../api/user.api';

export interface ProfileResponse {
  code: number;
  status: string;
  data: Profile;
  paginationResponse: any | null;
}

export interface Profile {
  email: string;
  username: string;
  roles: Array<string>;
}

interface ProfilState {
  profile: Profile | null;
}

const PROFILE = makeStateKey<Profile | null>('profile');
const PROFILE_ERROR = makeStateKey<string | null>('profile_error');

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private state = new BehaviorSubject<ProfilState>({
    profile: null,
  });
  state$: Observable<ProfilState> = this.state.asObservable();

  private readonly cookieService = inject(SsrCookieService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);
  private readonly api = authApi(this.cookieService, this.platformId);
  private readonly userApi = inject(UserApi);

  constructor() {}

  fetchProfile(): Observable<Profile | null> {
    // Check if profile data exists in TransferState
    if (this.transferState.hasKey(PROFILE)) {
      const profile = this.transferState.get(PROFILE, null);
      this.updateState({ profile });

      // Check for server-side error in browser
      const errorMessage = this.transferState.get(PROFILE_ERROR, null);
      if (isPlatformBrowser(this.platformId) && errorMessage) {
        return throwError(() => new Error(errorMessage));
      }
      return of(profile);
    }

    // Server-side: Fetch profile and store in TransferState
    if (isPlatformServer(this.platformId)) {
      const token = this.api.getAccessToken();
      if (token) {
        return this.userApi.getOwnProfile().pipe(
          tap((profile) => {
            this.updateState({ profile });
            this.transferState.set(PROFILE, profile);
            this.transferState.set(PROFILE_ERROR, null);
          }),
          catchError((error) => {
            console.error('Error fetching profile:', error); // Debugging
            const errorMessage =
              error.status === 0
                ? 'The server is unreachable'
                : error.message || 'Failed to load profile';
            this.updateState({ profile: null });
            this.transferState.set(PROFILE, null);
            this.transferState.set(PROFILE_ERROR, errorMessage);
            return throwError(() => new Error(errorMessage));
          }),
        );
      }
    }

    // Client-side: Return empty observable if not in server
    return of(null);
  }

  getState(): Observable<ProfilState> {
    return this.state$;
  }

  getProfile(): Profile | null {
    return this.state.value.profile;
  }

  private updateState(newState: Partial<ProfilState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
