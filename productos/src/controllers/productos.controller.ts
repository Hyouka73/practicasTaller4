// src/controllers/productos.controller.ts
import { ResultSetHeader } from 'mysql2'; 
import { Request, Response } from 'express';
import pool from '../config/database';

export const getProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Obtén el ID de los parámetros de la ruta

        let query: string;
        let params: any[];

        if (id) {
            // Si se proporciona un ID, busca un producto específico
            query = 'SELECT * FROM productos WHERE id = ?';
            params = [id];
        } else {
            // Si no se proporciona un ID, devuelve el primer producto (o puedes cambiar esto para devolver todos)
            query = 'SELECT * FROM productos LIMIT 1';
            params = [];
        }

        const [rows] = await pool.query(query, params);

        if (Array.isArray(rows) && rows.length === 0 && id) {
            // Si no se encuentra un producto con el ID proporcionado
            res.status(404).json({
                message: "Producto no encontrado",
                error: true
            });
            return;
        }

        res.json({
            message: id ? "Producto encontrado" : "Lista de productos",
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

export const updateProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, descripcion } = req.body;

        const updates: string[] = [];
        const values: any[] = [];

        if (nombre !== undefined) {
            updates.push('nombre = ?');
            values.push(nombre);
        }
        if (precio !== undefined) {
            updates.push('precio = ?');
            values.push(precio);
        }
        if (stock !== undefined) {
            updates.push('stock = ?');
            values.push(stock);
        }
        if (descripcion !== undefined) {
            updates.push('descripcion = ?');
            values.push(descripcion);
        }

        if (updates.length === 0) {
            res.status(400).json({
                message: "No se proporcionaron campos para actualizar",
                error: true
            });
            return;
        }

        values.push(id);
        const query = `UPDATE productos SET ${updates.join(', ')} WHERE id = ?`;
        
        // Agrega el tipo ResultSetHeader
        const [result] = await pool.query<ResultSetHeader>(query, values);

        if (result.affectedRows === 0) { // Ahora debería reconocer la propiedad
            res.status(404).json({
                message: "Producto no encontrado",
                error: true
            });
            return;
        }

        res.json({
            message: "Producto actualizado exitosamente",
            data: result
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({
            message: "Error al actualizar el producto",
            error: true
        });
    }
};

export const deleteProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        // Añade el tipo ResultSetHeader aquí también
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({
                message: "Producto no encontrado",
                error: true
            });
            return;
        }

        res.json({
            message: "Producto eliminado exitosamente",
            data: result
        });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({
            message: "Error al eliminar el producto",
            error: true
        });
    }
};