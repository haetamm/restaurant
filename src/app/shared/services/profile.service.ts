import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { userApi } from '../api/user.api';
import { authApi } from '../api/auth.api';

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

  private readonly toastService = inject(HotToastService);

  async setProfile(): Promise<void> {
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
}
