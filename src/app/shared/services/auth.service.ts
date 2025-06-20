import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ForgotPasswordFormType,
  ResetPasswordFormType,
} from '../utils/validation';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { urlPage } from '../utils/constans';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { authApi } from '../api/auth.api';
import { isPlatformBrowser } from '@angular/common';
import { ModalService } from './modal.service';

export interface GoogleInfo {
  name: string;
  username: string;
  email: string;
  tokenAccess: string;
  phone: string;
  password: string;
}

interface AuthState {
  loading: boolean;
  googleInfo: GoogleInfo | null;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface ResetPass {
  password: string;
  token: string;
}

export interface RegisterUser {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}

export interface RegisterUserGoogle {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string | null;
  tokenAccess: string;
}

export interface SocialiteRequest {
  code: string;
  scope: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state = new BehaviorSubject<AuthState>({
    loading: false,
    googleInfo: null,
  });
  state$: Observable<AuthState> = this.state.asObservable();

  loading$: Observable<boolean> = this.state.pipe(
    map((state) => state.loading),
  );

  private readonly router = inject(Router);
  private readonly toastService = inject(HotToastService);
  private readonly profileService = inject(ProfileService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly modalService = inject(ModalService);

  getLoading(): boolean {
    return this.state.value.loading;
  }

  async register(payload: RegisterUser): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await authApi.register(payload);
      this.toastService.success(message);
      await this.router.navigate([urlPage.LOGIN]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Registration failed', {
        autoClose: false,
      });
    } finally {
      this.updateState({ loading: false });
    }
  }

  async login(payload: LoginUser): Promise<void> {
    this.updateState({ loading: true });
    try {
      const token = await authApi.login(payload);
      authApi.putAccessToken(token);
      this.toastService.success(`Welcome, ${payload.username}!`);
      await this.router.navigate([urlPage.HOME]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Login failed', {
        autoClose: false,
      });
    } finally {
      this.updateState({ loading: false });
    }
  }

  async loginWithGoogle(payload: SocialiteRequest): Promise<void> {
    this.updateState({ loading: true });
    try {
      const result = await authApi.socialite(payload);
      if (result.token) {
        if (isPlatformBrowser(this.platformId)) {
          authApi.putAccessToken(result.token);

          if (window.opener) {
            window.opener.postMessage(
              {
                googleLoginSuccess: true,
                token: result.token,
              },
              '*',
            );
            window.close(); // close popup
          }
        }
      } else {
        this.updateState({ loading: false, googleInfo: result });
        if (isPlatformBrowser(this.platformId)) {
          if (window.opener) {
            window.opener.postMessage(
              {
                googleLoginSuccess: true,
                tokenAccess: result.tokenAccess,
                result: result,
              },
              '*',
            );
            window.close(); // close popup
          }
        }
      }
    } catch (error: any) {
      if (isPlatformBrowser(this.platformId)) {
        this.toastService.error(error.message || 'Login failed', {
          autoClose: false,
        });
      }
    } finally {
      this.updateState({ loading: false });
    }
  }

  async registerUserGoogle(payload: RegisterUserGoogle): Promise<void> {
    this.updateState({ loading: true });
    try {
      const { token } = await authApi.registerUserGoogle(payload);
      authApi.putAccessToken(token);
      this.toastService.success(`Welcome, ${payload.username}!`);
      this.modalService.hideModal();
      await this.router.navigate([urlPage.HOME]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Registration failed', {
        autoClose: false,
      });
    } finally {
      this.updateState({ loading: false });
    }
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
      const message = await authApi.forgotPassword(data);
      form.reset();
      this.toastService.success(message);
    } catch (error: any) {
      this.toastService.error(
        error.message || 'Forgot password request failed',
        {
          autoClose: false,
        },
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
      const message = await authApi.resetPassword({
        password: data.password,
        token,
      });
      await this.router.navigate([urlPage.LOGIN]);
      this.toastService.success(message);
    } catch (error: any) {
      this.toastService.error(error.message || 'Password reset failed', {
        autoClose: false,
      });
    } finally {
      this.updateState({ loading: false });
    }
  }

  async activation(token: string): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await authApi.activation({ token });
      await this.router.navigate([urlPage.LOGIN]);
      this.toastService.success(message);
    } catch (error: any) {
      this.toastService.error(error.message || 'Account activation failed', {
        autoClose: false,
      });
    } finally {
      this.updateState({ loading: false });
    }
  }

  setGoogleInfo(data: GoogleInfo) {
    this.updateState({ googleInfo: data });
  }

  private updateState(newState: Partial<AuthState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
