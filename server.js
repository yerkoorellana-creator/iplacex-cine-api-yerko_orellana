import express from 'express';
import cors from 'cors';
import { connectDB } from './src/common/db.js';
import { peliculaRoutes } from './src/pelicula/routes.js';
import { ActorRoutes } from './src/actor/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta por defecto GET
app.get('/', (req, res) => {
  res.status(200).send("Bienvenido al cine Iplacex");
});

// Rutas personalizadas con prefijo /api
app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

// Levantar el servidor de Express solo si la conexión a Atlas se genera correctamente
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor de Express escuchando correctamente en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error crítico al iniciar el servidor:", error);
  });