const fs = require("fs");
const path = require("path");

const envFile = path.join(__dirname, "../src/environments/environment.prod.ts");
const baseUrl = process.env.BASE_URL || "http://localhost:8081/api";
const googleRedirectUri =
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:4200/guest/login";
const googleClientId =
  process.env.CLIENT_ID ||
  "985452126184-eusbg96lk4e39pardmstchbc7ltc9mtg.apps.googleusercontent.com";
const googleScope =
  process.env.GOOGLE_SCOPE ||
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid";

const googleResponseType = process.env.RESPONSE_TYPE || "code";
const googleAccessType = process.env.ACCESS_TYPE || "offline";

const content = `
export const environment = {
  production: true,
  baseUrl: '${baseUrl}',
  googleRedirectUri: '${googleRedirectUri}',
  googleClientId: '${googleClientId}',
  googleScope: '${googleScope}',
  googleResponseType: '${googleResponseType}',
  googleAccessType: '${googleAccessType}',
};
`;

fs.writeFileSync(envFile, content);
console.log("Updated environment.prod.ts with BASE_URL:", baseUrl);
console.log(
  "Updated environment.prod.ts with GOOGLE_REDIRECT_URI:",
  googleRedirectUri,
);
console.log("Updated environment.prod.ts with CLIENT_ID:", googleClientId);
console.log("Updated environment.prod.ts with GOOGLE_SCOPE:", googleScope);
console.log(
  "Updated environment.prod.ts with RESPONSE_TYPE:",
  googleResponseType,
);
console.log("Updated environment.prod.ts with ACCESS_TYPE:", googleAccessType);
