import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { authApi } from '../api/auth.api';
import { userApi } from '../api/user.api';
import { urlPage } from '../utils/constans';

export interface Profile {
  name: string;
  phone: string;
  address: string;
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

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async fetchProfile(): Promise<void> {
    this.updateState({ loading: true });
    try {
      const token = authApi.getAccessToken();
      if (!token) {
        this.updateState({ profile: null, loading: false });
        return;
      }
      const data = await userApi.getOwnProfile();
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

  logout() {
    authApi.removeAccessToken();
    this.updateState({ profile: null, loading: false });
    window.location.href = urlPage.LOGIN;
  }
}
