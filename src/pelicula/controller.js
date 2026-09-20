import { ObjectId } from 'mongodb';
import { client, dbName } from '../common/db.js';

// Constante global exigida para acceder a la colección
const peliculaCollection = client.db(dbName).collection('peliculas');

// Agregar una película
export const handleInsertPeliculaRequest = async (req, res) => {
  const { nombre, generos, anioEstreno } = req.body;
  const nuevaPelicula = { nombre, generos, anioEstreno };

  peliculaCollection.insertOne(nuevaPelicula)
    .then(result => res.status(201).json({ _id: result.insertedId, ...nuevaPelicula }))
    .catch(error => res.status(500).json({ mensaje: "Error al insertar la película", error: error.message }));
};

// Obtener todas las películas
export const handleGetPeliculasRequest = async (req, res) => {
  peliculaCollection.find({}).toArray()
    .then(peliculas => res.status(200).json(peliculas))
    .catch(error => res.status(500).json({ mensaje: "Error al obtener las películas", error: error.message }));
};

// Obtener una película por _id
export const handleGetPeliculaByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ mensaje: "Id mal formado" });
  }

  peliculaCollection.findOne({ _id: objectId })
    .then(pelicula => {
      if (!pelicula) return res.status(404).json({ mensaje: "Recurso no encontrado" });
      res.status(200).json(pelicula);
    })
    .catch(error => res.status(500).json({ mensaje: "Error al consultar la película", error: error.message }));
};

// Actualizar una película por _id
export const handleUpdatePeliculaByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ mensaje: "Id mal formado" });
  }

  const { nombre, generos, anioEstreno } = req.body;
  peliculaCollection.updateOne({ _id: objectId }, { $set: { nombre, generos, anioEstreno } })
    .then(result => {
      if (result.matchedCount === 0) return res.status(404).json({ mensaje: "Recurso no encontrado" });
      res.status(200).json({ mensaje: "Película actualizada correctamente" });
    })
    .catch(error => res.status(500).json({ mensaje: "Error al actualizar la película", error: error.message }));
};

// Eliminar una película por _id
export const handleDeletePeliculaByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ mensaje: "Id mal formado" });
  }

  peliculaCollection.deleteOne({ _id: objectId })
    .then(result => {
      if (result.deletedCount === 0) return res.status(404).json({ mensaje: "Recurso no encontrado" });
      res.status(200).json({ mensaje: "Película eliminada correctamente" });
    })
    .catch(error => res.status(500).json({ mensaje: "Error al eliminar la película", error: error.message }));
};