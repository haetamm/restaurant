import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { authApi } from '../api/auth.api';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { userApi } from '../api/user.api';

export interface Profile {
  email: string;
  username: string;
  roles: Array<string>;
}

interface ProfilState {
  loading: boolean;
  profile: Profile | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private state = new BehaviorSubject<ProfilState>({
    profile: null,
    loading: false,
  });
  state$: Observable<ProfilState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly toastService = inject(HotToastService);
  private readonly cookieService = inject(SsrCookieService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly apiAuth = authApi(this.cookieService, this.platformId);
  private readonly apiUser = userApi(this.cookieService, this.platformId);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchProfile(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const token = this.apiAuth.getAccessToken();
      if (!token) {
        this.updateState({ profile: null, loading: false });
        return;
      }
      const data = await this.apiUser.getOwnProfile();
      this.updateState({ profile: data, loading: false });
    } catch (error: any) {
      this.updateState({ profile: null, loading: false });
      this.toastService.error(error.message || 'Failed to load profile');
    }
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
