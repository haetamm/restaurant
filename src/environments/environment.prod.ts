export const environment = {
  production: true,
  baseUrl: 'http://localhost:8081/api',
  googleRedirectUri: 'http://localhost:4200/guest/login',
  googleClientId:
    '985452126184-eusbg96lk4e39pardmstchbc7ltc9mtg.apps.googleusercontent.com',
  googleScope:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
  googleResponseType: 'code',
  googleAccessType: 'offline',
};
