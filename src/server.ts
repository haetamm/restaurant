import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from '../server/routes';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware untuk parsing JSON body
app.use(express.json());

// Static assets
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Daftarkan semua route API dengan prefiks /api
app.use('/api', apiRoutes);

// Route untuk SSR
app.use('/**', (req, res, next) => {
  // Tentukan baseUrl berdasarkan VERCEL_URL atau fallback ke localhost
  const baseUrl = process.env['VERCEL_URL']
    ? `https://${process.env['VERCEL_URL']}`
    : 'http://localhost:4000';

  angularApp
    .handle(req, { baseUrl }) // Kirim baseUrl ke Angular SSR
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Jalankan server hanya jika bukan di Vercel
if (isMainModule(import.meta.url) && process.env['VERCEL'] !== '1') {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
