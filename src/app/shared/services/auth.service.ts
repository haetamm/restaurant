import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

// Define the AuthState interface without token
interface AuthState {
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialize state with default values
  private state = new BehaviorSubject<AuthState>({ loading: false });
  state$: Observable<AuthState> = this.state.asObservable();

  // Use dependency injection with proper typing
  private readonly router = inject(Router);
  private readonly toastService = inject(HotToastService);
  private readonly profileService = inject(ProfileService);

  async register(data: RegisterFormType): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await authApi.register(data);
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
      const token = await authApi.login(data);
      authApi.putAccessToken(token);
      this.toastService.success(`Welcome, ${data.username}!`);
      await this.profileService.setProfile();
      await this.router.navigate([urlPage.HOME]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Login failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  logout(): void {
    authApi.removeAccessToken();
    this.updateState({ loading: false });
    this.router.navigate([urlPage.LOGIN]);
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
      this.toastService.success(message);
      form.reset();
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
      const message = await authApi.resetPassword({
        password: data.password,
        token,
      });
      this.toastService.success(message);
      await this.router.navigate([urlPage.LOGIN]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Password reset failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  async activation(token: string): Promise<void> {
    this.updateState({ loading: true });
    try {
      const message = await authApi.activation({ token });
      this.toastService.success(message);
      await this.router.navigate([urlPage.LOGIN]);
    } catch (error: any) {
      this.toastService.error(error.message || 'Account activation failed');
    } finally {
      this.updateState({ loading: false });
    }
  }

  // Helper method to update state
  private updateState(newState: Partial<AuthState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }
}
