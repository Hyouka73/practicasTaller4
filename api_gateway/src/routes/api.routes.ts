// src/routes/productosRoutes.ts

import express from 'express';
import { goApi, getID } from '../controllers/api.controller';

const router = express.Router();

router.get('/go', goApi);
router.get('/id', getID);


export default router;
