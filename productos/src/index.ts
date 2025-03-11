import express from 'express';
import dotenv from "dotenv";
import productosRoutes from './routes/productos.routes';
import pool from './config/database';

// Configurar dotenv con la ruta correcta a tu archivo .env
dotenv.config({ path: "./src/.env" });
 
const app = express();
const port = process.env.PORT;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/', productosRoutes);

// Función para verificar la conexión a la base de datos
const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return false;
  }
};

// Iniciar el servidor solo si la conexión a la base de datos es exitosa
const startServer = async () => {
  const isConnected = await testDatabaseConnection();
  
  if (isConnected) {
    app.listen(port, () => {
      console.log(`Servicio de Productos funcionando en el puerto ${port}`);
    });
  } else {
    console.error('No se pudo iniciar el servidor debido a problemas con la base de datos');
    process.exit(1);
  }
};

startServer();