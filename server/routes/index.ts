import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import menuRoutes from './menu.routes';
import categoryRoutes from './category.routes';
import cartRoutes from './cart.routes';
import billRoutes from './bill.routes';
import tableRoutes from './table.routes';

const router = Router();

// Daftarkan grup route dengan prefiks
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/menu', menuRoutes);
router.use('/category', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/bill', billRoutes);
router.use('/table', tableRoutes);

// Grup route lain bisa ditambahkan di sini
// Contoh: router.use('/user', userRoutes);

export default router;
