// src/controllers/productos.controller.ts
import { Request, Response } from 'express';
import pool from '../config/database';

export const getProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos LIMIT 1');
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

export const getAllProductos = async (req: Request, res: Response): Promise<void> => {
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

export const createProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = Array.isArray(req.body) ? req.body : [req.body];
        
        if (productos.length === 0) {
            res.status(400).json({
                message: "No se proporcionaron productos para crear",
                error: true
            });
            return; // Asegúrate de retornar después de enviar la respuesta
        }

        const values = productos.map(p => [p.nombre, p.precio, p.stock || 0, p.descripcion]);
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES ?',
            [values]
        );

        res.status(201).json({
            message: "Productos creados exitosamente",
            data: result
        });
    } catch (error) {
        console.error('Error al crear productos:', error);
        res.status(500).json({
            message: "Error al crear productos",
            error: true
        });
    }
};