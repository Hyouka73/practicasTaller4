// src/routes/productosRoutes.ts

import express from 'express';
import { getProductos, getAllProductos } from '../controllers/productos.controller';

const router = express.Router();

router.get('/productos', getProductos);
router.get('/productos/all', getAllProductos);


export default router;
