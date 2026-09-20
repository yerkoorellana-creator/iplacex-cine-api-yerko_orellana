import { ObjectId } from 'mongodb';
import { client, dbName } from '../common/db.js';

// Constante global exigida para la colección de actores
const actorCollection = client.db(dbName).collection('actores');
const peliculaCollection = client.db(dbName).collection('peliculas');

// Agregar un actor (valida la película por su nombre)
export const handleInsertActorRequest = async (req, res) => {
  const { nombrePelicula, nombre, edad, estaRetirado, premios } = req.body;

  try {
    const pelicula = await peliculaCollection.findOne({ nombre: nombrePelicula });
    
    if (!pelicula) {
      return res.status(404).json({ mensaje: "La película especificada no existe en la base de datos" });
    }

    const nuevoActor = {
      idPelicula: pelicula._id.toString(),
      nombre,
      edad,
      estaRetirado,
      premios
    };

    actorCollection.insertOne(nuevoActor)
      .then(result => res.status(201).json({ _id: result.insertedId, ...nuevoActor }))
      .catch(error => res.status(500).json({ mensaje: "Error al insertar el actor", error: error.message }));
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
};

// Obtener todos los actores
export const handleGetActoresRequest = async (req, res) => {
  actorCollection.find({}).toArray()
    .then(actores => res.status(200).json(actores))
    .catch(error => res.status(500).json({ mensaje: "Error al obtener los actores", error: error.message }));
};

// Obtener actor por su _id
export const handleGetActorByIdRequest = async (req, res) => {
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({ mensaje: "Id mal formado" });
  }

  actorCollection.findOne({ _id: objectId })
    .then(actor => {
      if (!actor) return res.status(404).json({ mensaje: "Recurso no encontrado" });
      res.status(200).json(actor);
    })
    .catch(error => res.status(500).json({ mensaje: "Error al consultar el actor", error: error.message }));
};

// Obtener actores por el _id de la película
export const handleGetActoresByPeliculaRequest = async (req, res) => {
  const idPelicula = req.params.idPelicula || req.params.pelicula;
  
  actorCollection.find({ idPelicula: idPelicula }).toArray()
    .then(actores => res.status(200).json(actores))
    .catch(error => res.status(500).json({ mensaje: "Error al obtener actores de la película", error: error.message }));
};