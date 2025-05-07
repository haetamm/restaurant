import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { authApi } from '../api/auth.api';
import { LoginFormType, RegisterFormType } from '../utils/validation';
import { HotToastService } from '@ngxpert/hot-toast';

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
      })
      .catch((error) => {
        console.log('Login error:', error);
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
}
