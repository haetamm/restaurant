import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
import { authApi } from '../api/auth.api';
import { userApi } from '../api/user.api';
import { urlPage } from '../utils/constans';

export interface ProfileRequest {
  name: string;
  phone: string;
  address: string;
  username: string;
}

export interface UpdatePasswordRequest {
  password: string;
  repeatPassword: string;
  passwordConfirmation: string;
}

export interface UpdateEmailRequest {
  newEmail: string;
  passwordConfirmation: string;
}

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

  async updateProfile(profile: ProfileRequest): Promise<void> {
    try {
      const data = await userApi.updateOwnProfile(profile);
      this.updateState({ profile: data });
      this.toastService.success('Profile berhasil diupdate');
    } catch (error: any) {
      this.toastService.error(error.message || 'Failed to update profile');
      throw error;
    }
  }

  async updateProfilePassword(profile: UpdatePasswordRequest): Promise<void> {
    try {
      await userApi.updateOwnProfilePassword(profile);
      this.toastService.success('Password berhasil diupdate');
    } catch (error: any) {
      this.toastService.error(error.message || 'Failed to update password');
      throw error;
    }
  }

  async updateProfileEmail(data: UpdateEmailRequest): Promise<void> {
    try {
      const result = await userApi.updateOwnProfileEmail(data);
      this.toastService.success(result, {
        autoClose: false,
      });
    } catch (error: any) {
      this.toastService.error(error.message || 'Failed to update password');
      throw error;
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
