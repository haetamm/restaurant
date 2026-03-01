require("dotenv").config();
const fs = require("fs");
const path = require("path");

const envFile = path.join(__dirname, "../src/environments/environment.ts");
const production = process.env.PRODUCTION;
const baseUrl = process.env.API_BASE_URL;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;
const googleClientId = process.env.CLIENT_ID;
const googleScope = process.env.GOOGLE_SCOPE;
const googleResponseType = process.env.RESPONSE_TYPE;
const googleAccessType = process.env.ACCESS_TYPE;

const content = `
export const environment = {
  production: ${production},
  baseUrl: '${baseUrl}',
  googleRedirectUri: '${googleRedirectUri}',
  googleClientId: '${googleClientId}',
  googleScope: '${googleScope}',
  googleResponseType: '${googleResponseType}',
  googleAccessType: '${googleAccessType}',
};
`;

fs.writeFileSync(envFile, content);
console.log("Updated environment.ts with PRODUCTION:", production);
console.log("Updated environment.ts with BASE_URL:", baseUrl);
console.log(
  "Updated environment.ts with GOOGLE_REDIRECT_URI:",
  googleRedirectUri,
);
console.log("Updated environment.ts with CLIENT_ID:", googleClientId);
console.log("Updated environment.ts with GOOGLE_SCOPE:", googleScope);
console.log("Updated environment.ts with RESPONSE_TYPE:", googleResponseType);
console.log("Updated environment.ts with ACCESS_TYPE:", googleAccessType);
