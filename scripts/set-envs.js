
const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config();

const targerPath = './src/environments/environments.ts';

const envFileContent = `
export const environment={
  baseUrl: "${process.env['BASE_URL']}",
  googleClient: "${process.env['GOOGLE_CLIENT']}"
}
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync( targerPath, envFileContent )
