// src/controllers/productosController.ts

import { Request, Response } from 'express';

export const getProductos = (req: Request, res: Response) => {
    res.send("Lista de productos");
};

export const getAllProductos = (req: Request, res: Response) => {
    res.send("Todos los productos");
};