// src/routes/productos.routes.ts

import { Router } from 'express';
import { getProductos, 
    getAllProductos, 
    createProductos,
    updateProducto,
    deleteProducto
} from '../controllers/productos.controller';

const router = Router();

router.get('/productos/:id?', getProductos);
router.get('/productos-all', getAllProductos);
router.post('/productos', createProductos);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

export default router;