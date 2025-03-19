// src/routes/productos.routes.ts

import { Router } from 'express';
import { getProductos, getAllProductos, createProductos } from '../controllers/productos.controller';

const router = Router();

router.get('/productos/id', getProductos);
router.get('/productos', getAllProductos);
router.post('/productos', createProductos);

export default router;