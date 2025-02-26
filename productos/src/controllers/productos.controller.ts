// src/controllers/productosController.ts

import { Request, Response } from 'express';

export const getProductos = (req: Request, res: Response) => {
    res.json({ message: "Lista de productos", data: [{ id: 1, name: "Producto 1" }, { id: 2, name: "Producto 2" }] });
};

export const getAllProductos = (req: Request, res: Response) => {
    res.json({ message: "Todos los productos", data: [{ id: 1, name: "Producto 1" }, { id: 2, name: "Producto 2" }, { id: 3, name: "Producto 3" }] });
};