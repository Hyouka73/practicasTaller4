// src/controllers/productosController.ts

import { Request, Response } from 'express';

export const getUsuarios = (req: Request, res: Response) => {
    res.json([{"id":1, "nombre":"uno","Correo":"sdfklsjafd@sjfdj.com" },
        {"id":2, "nombre":"dos","Correo":"sdfklsjafd@sjfdj.com" },
        {"id":3, "nombre":"tres","Correo":"sdfklsjafd@sjfdj.com" }
    ]);
};

export const getAllUsuarios = (req: Request, res: Response) => {
    res.send("Todos los usuarios");
};