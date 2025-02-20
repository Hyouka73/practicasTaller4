// src/controllers/productosController.ts

import { Request, Response } from 'express';

export const goApi = (req: Request, res: Response) => {
    res.send("Yendo a la API");
};

function generateSimpleId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}    

export const getID = (req: Request, res: Response) => {
    const uniqueId = generateSimpleId(16); // Genera un ID de 16 caracteres
    res.send("Tu ID es: " + uniqueId);
};