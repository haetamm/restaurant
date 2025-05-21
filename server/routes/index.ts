import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import menuRoutes from './menu.routes';
import categoryRoutes from './category.routes';
import cartRoutes from './cart.routes';

const router = Router();

// Daftarkan grup route dengan prefiks
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/menu', menuRoutes);
router.use('/category', categoryRoutes);
router.use('/cart', cartRoutes);

// Grup route lain bisa ditambahkan di sini
// Contoh: router.use('/user', userRoutes);

export default router;
