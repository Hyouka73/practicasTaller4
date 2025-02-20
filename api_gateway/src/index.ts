import express from 'express';
import dotenv from "dotenv";
import apiRoutes from './routes/api.routes';

dotenv.config({ path: "./src/.env" });
 
const app = express();
const port = process.env.PORT;

app.use('/', apiRoutes);

app.listen(port, () => {
    console.log("Servicio de Api Gateway funcionando!", port);
});