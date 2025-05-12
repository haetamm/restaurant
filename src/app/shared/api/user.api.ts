import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { isPlatformBrowser } from '@angular/common';
import { Profile, ProfileResponse } from '../services/profile.service';
import { createHttpOptions } from './http-config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(SsrCookieService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = environment.baseUrl;

  getOwnProfile(): Observable<Profile | null> {
    try {
      const options = createHttpOptions(this.cookieService);
      return this.http
        .get<ProfileResponse>(`${this.baseUrl}/user`, options)
        .pipe(
          map((response) => {
            return response.data;
          }),
          catchError((error) => {
            if (isPlatformBrowser(this.platformId) && error.status === 401) {
              this.cookieService.delete('token');
              window.location.assign('/login');
            }
            return throwError(() => error);
          }),
        );
    } catch (error: any) {
      console.error('UserApi token error:', error);
      return throwError(() => error);
    }
  }
}
