import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from '../server/routes';
import { urlPage } from './app/shared/utils/constans';

// Kumpulin semua process.env di awal
const BASE_URL = process.env['BASE_URL'];
const PORT = process.env['PORT'];
const VERCEL = process.env['VERCEL'];
const ALLOWED_ORIGINS = process.env['ALLOWED_ORIGINS']
  ? process.env['ALLOWED_ORIGINS'].split(',')
  : [];

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  const origin = req.get('Origin') || req.get('Referer') || '';
  if (ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) {
    return next();
  }
  res.status(403).json({ message: 'Access Denied' });
});

app.use('/api', apiRoutes);

// Static assets
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Route SSR
app.use('/**', (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'];
  const url = req.originalUrl;

  if (token && url.startsWith('/guest')) {
    res.redirect(301, '/welcome');
    return;
  }

  if (!token && url.startsWith('/on')) {
    res.redirect(301, urlPage.LOGIN);
    return;
  }

  const baseUrl = BASE_URL;

  angularApp
    .handle(req, { baseUrl })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Error handling CSRF
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'EBADCSRFTOKEN') {
    console.error('CSRF Error:', {
      url: req.originalUrl,
      method: req.method,
      headers: req.headers,
      cookies: req.cookies,
    });
    res.status(403).json({ message: 'Access Denied' });
  } else {
    next(err);
  }
});

// Jalankan server lokal
if (isMainModule(import.meta.url) && !VERCEL) {
  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
