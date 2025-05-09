import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import cookieParser from 'cookie-parser';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// parse cookie
app.use(cookieParser());

// Serve static files dari /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Handle semua rute
app.use('/**', (req, res, next) => {
  const token = req.cookies['token'];
  const url = req.originalUrl;

  // jika terdapat token dan akses rute /guest, redirect ke /home
  if (token && url.startsWith('/guest')) {
    res.redirect(301, '/home');
    return;
  }

  // Lanjutkan rendering Angular SSR
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Request handler buat Angular CLI atau Firebase Cloud Functions
export const reqHandler = createNodeRequestHandler(app);
