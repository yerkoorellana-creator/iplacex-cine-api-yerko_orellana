import express from 'express';
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaRequest
} from './controller.js';

export const ActorRoutes = express.Router();

ActorRoutes.post('/actor', handleInsertActorRequest);
ActorRoutes.get('/actores', handleGetActoresRequest);
ActorRoutes.get('/actor/:id', handleGetActorByIdRequest);
ActorRoutes.get('/actor/:pelicula/:idPelicula', handleGetActoresByPeliculaRequest);