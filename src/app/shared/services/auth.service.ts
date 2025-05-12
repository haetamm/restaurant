import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { authApi } from '../api/auth.api';
import {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
  ResetPasswordFormType,
} from '../utils/validation';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { urlPage } from '../utils/constans';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

interface AuthState {
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state = new BehaviorSubject<AuthState>({ loading: false });
  state$: Observable<AuthState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly router = inject(Router);
  private readonly toastService = inject(HotToastService);
  private readonly profileService = inject(ProfileService);
  private readonly cookieService = inject(SsrCookieService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly api = authApi(this.cookieService, this.platformId);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async register(data: RegisterFormType): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await this.api.register(data);
      this.toastService.success(message);
      await this.router.navigate([urlPage.LOGIN]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Registration failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  async login(data: LoginFormType): Promise<void> {
    this.updateState({ loading: true });
    try {
      const token = await this.api.login(data);
      this.api.putAccessToken(token);
      this.toastService.success(`Welcome, ${data.username}!`);
      this.profileService.fetchProfile();
      window.location.assign(urlPage.HOME);
    } catch (error: any) {
      this.toastService.error(error.message || 'Login failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  logout(): void {
    this.api.removeAccessToken();
    this.updateState({ loading: false });
    window.location.assign(urlPage.LOGIN);
  }

  getState(): Observable<AuthState> {
    return this.state$;
  }

  async forgotPassword(
    data: ForgotPasswordFormType,
    form: FormGroup,
  ): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await this.api.forgotPassword(data);
      form.reset();
      this.toastService.success(message);
    } catch (error: any) {
      this.toastService.error(
        error.message || 'Forgot password request failed',
      );
    } finally {
      this.updateState({ loading: false });
    }
  }

  async resetPassword(
    data: ResetPasswordFormType,
    token: string,
  ): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await this.api.resetPassword({
        password: data.password,
        token,
      });
      await this.router.navigate([urlPage.LOGIN]);
      this.toastService.success(message);
    } catch (error: any) {
      this.toastService.error(error.message || 'Password reset failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  async activation(token: string): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await this.api.activation({ token });
      await this.router.navigate([urlPage.LOGIN]);
      this.toastService.success(message);
    } catch (error: any) {
      this.toastService.error(error.message || 'Account activation failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  private updateState(newState: Partial<AuthState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
