const fs = require("fs");
const path = require("path");

const envFile = path.join(__dirname, "../src/environments/environment.prod.ts");
const baseUrl = process.env.BASE_URL || "http://localhost:8081/api";

const content = `
export const environment = {
  production: true,
  baseUrl: '${baseUrl}',
};
`;

fs.writeFileSync(envFile, content);
console.log("Updated environment.prod.ts with BASE_URL:", baseUrl);
