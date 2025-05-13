import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

// Daftarkan grup route dengan prefiks
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

// Grup route lain bisa ditambahkan di sini
// Contoh: router.use('/user', userRoutes);

export default router;
