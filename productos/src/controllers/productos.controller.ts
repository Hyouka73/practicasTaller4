// src/controllers/productosController.ts

import { Request, Response } from 'express';
import pool from '../config/database';

export const getProductos = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos LIMIT 2');
        res.json({ 
            message: "Lista de productos", 
            data: rows 
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            message: "Error al obtener productos", 
            error: true 
        });
    }
};

export const getAllProductos = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json({ 
            message: "Todos los productos", 
            data: rows 
        });
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        res.status(500).json({ 
            message: "Error al obtener todos los productos", 
            error: true 
        });
    }
};