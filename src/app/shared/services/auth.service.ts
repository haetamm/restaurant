import { inject, Injectable } from '@angular/core';
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

interface AuthState {
  loading: boolean;
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

  private updateState(newState: Partial<AuthState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
