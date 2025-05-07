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

interface AuthState {
  token: string | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state = new BehaviorSubject<AuthState>({
    token: authApi.getAccessToken() || null,
    loading: false,
  });
  state$ = this.state.asObservable();
  private router = inject(Router);

  constructor(private toastService: HotToastService) {
    if (!toastService) {
      console.error('HotToastService is not injected');
    }
  }

  register(data: RegisterFormType): void {
    this.state.next({ ...this.state.getValue(), loading: true });
    authApi
      .register(data)
      .then((data) => {
        this.toastService.success(data);
        this.state.next({ ...this.state.getValue(), loading: false });
        this.router.navigate([urlPage.LOGIN]);
      })
      .catch((error) => {
        this.toastService.error(error.message);
        this.state.next({
          ...this.state.getValue(),
          loading: false,
        });
      });
  }

  login(data: LoginFormType): void {
    this.state.next({ ...this.state.getValue(), loading: true });
    authApi
      .login(data)
      .then((token) => {
        authApi.putAccessToken(token);
        this.state.next({ token, loading: false });
        this.toastService.success(`selamat datang ${data.username}`);
        this.router.navigate([urlPage.HOME]);
      })
      .catch((error) => {
        this.toastService.error(error.message);
        this.state.next({
          ...this.state.getValue(),
          loading: false,
        });
      });
  }

  logout(): void {
    authApi.removeAccessToken();
    this.state.next({ token: null, loading: false });
  }

  getState(): Observable<AuthState> {
    return this.state$;
  }

  forgotPassword(data: ForgotPasswordFormType, form: FormGroup): void {
    this.state.next({ ...this.state.getValue(), loading: true });
    authApi
      .forgotPassword(data)
      .then((data) => {
        this.toastService.success(data);
        this.state.next({ ...this.state.getValue(), loading: false });
        form.reset();
      })
      .catch((error) => {
        this.toastService.error(error.message);
        this.state.next({
          ...this.state.getValue(),
          loading: false,
        });
      });
  }

  resetPassword(data: ResetPasswordFormType, token: string): void {
    this.state.next({ ...this.state.getValue(), loading: true });
    authApi
      .resetPassword({ password: data.password, token })
      .then((data) => {
        this.toastService.success(data);
        this.state.next({ ...this.state.getValue(), loading: false });
        this.router.navigate([urlPage.LOGIN]);
      })
      .catch((error) => {
        this.toastService.error(error.message);
        this.state.next({
          ...this.state.getValue(),
          loading: false,
        });
      });
  }

  activation(token: string): void {
    this.state.next({ ...this.state.getValue(), loading: true });
    authApi
      .activation({ token })
      .then((data) => {
        this.toastService.success(data);
        this.state.next({ ...this.state.getValue(), loading: false });
        this.router.navigate([urlPage.LOGIN]);
      })
      .catch((error) => {
        this.toastService.error(error.message);
        this.state.next({
          ...this.state.getValue(),
          loading: false,
        });
      });
  }
}
