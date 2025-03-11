import express from 'express';
import dotenv from "dotenv";
import apiRoutes from './routes/api.routes';

dotenv.config({ path: "./src/.env" });

const app = express();
const axiosInstance = require('axios');
const port = process.env.PORT;

// // Basic middleware to log request method and URL
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next();
// });

// // Middleware to add token to headers
// app.use((req, res, next) => {
//     req.headers['Authorization'] = `Bearer ${process.env.TOKEN}`;
//     next();
// });

// Route to redirect to the usuarios server
app.use('/usuarios', (req, res) => {
    const url = `http://localhost:3002${req.originalUrl}`;
    axiosInstance({
        method: req.method,
        url: url,
        headers: req.headers
    }).then((response: { status: number; data: any; }) => {
        res.status(response.status).send(response.data);
    }).catch((error: { response?: { status: number; }; message: string; }) => {
        res.status(error.response ? error.response.status : 500).send(error.message);
    });
});

// Route to redirect to the productos server
app.use('/productos', (req, res) => {
    const url = `http://localhost:3001${req.originalUrl}`;
    axiosInstance({
        method: req.method,
        url: url,
        headers: req.headers
    }).then((response: { status: number; data: any; }) => {
        res.status(response.status).send(response.data);
    }).catch((error: { response?: { status: number; }; message: string; }) => {
        res.status(error.response ? error.response.status : 500).send(error.message);
    });
});
app.use('/productos/all', (req, res) => {
    const url = `http://localhost:3001${req.originalUrl}`;
    axiosInstance({
        method: req.method,
        url: url,
        headers: req.headers
    }).then((response: { status: number; data: any; }) => {
        res.status(response.status).send(response.data);
    }).catch((error: { response?: { status: number; }; message: string; }) => {
        res.status(error.response ? error.response.status : 500).send(error.message);
    });
});

app.use('/', apiRoutes);

app.listen(port, () => {
    console.log("Servicio de Api Gateway funcionando!", port);
});