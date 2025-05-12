import { HttpHeaders } from '@angular/common/http';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const createHttpOptions = (cookieService: SsrCookieService) => {
  const token = cookieService.get('token');
  if (!token) {
    console.error('No token found in http-config');
    throw new Error('No token available');
  }

  return {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
  };
};
