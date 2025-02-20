import express from 'express';
import { getUsuarios, getAllUsuarios } from '../controllers/usuarios.controller';

const router = express.Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/all', getAllUsuarios);


export default router;
