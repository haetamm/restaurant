require("dotenv").config();
const fs = require("fs");
const path = require("path");

const envDir = path.join(__dirname, "../src/environments");
const envFile = path.join(envDir, "environment.ts");

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
  console.log("Created folder:", envDir);
}

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

console.log("environment.ts updated successfully!");
