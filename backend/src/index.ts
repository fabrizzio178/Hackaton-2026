import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/database';
import mesaRoutes from './routes/mesa.routes';
import mozoRoutes from './routes/mozo.routes';
import aiRoutes from './routes/ai.routes';
import sesionRoutes from './routes/sesion.routes';
import juegoRoutes from './routes/juego.routes';
import productoRoutes from './routes/producto.routes';
import detalleMesaRoutes from './routes/detalleMesa.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Limita a 5 peticiones por ventana
  message: 'Demasiadas peticiones, intenta de nuevo más tarde',
  legacyHeaders: false,
  standardHeaders: 'draft-8'
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/ai', aiRateLimiter);

// Rutas
app.use('/api/mesas', mesaRoutes);
app.use('/api/mozos', mozoRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/sesiones', sesionRoutes);
app.use('/api/juegos', juegoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/detalles-mesa', detalleMesaRoutes);

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
