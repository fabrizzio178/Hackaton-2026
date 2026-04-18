import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/database';
import mesaRoutes from './routes/mesa.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/mesas', mesaRoutes);

// Manejo de ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Inicialización del servidor y base de datos
const startServer = async () => {
  await connectDB();
  
  // Sincronizar modelos con la base de datos (Nota: en producción es mejor usar migraciones)
  await sequelize.sync({ alter: true });
  console.log('✅ Modelos sincronizados con la base de datos.');

  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
};

startServer();
