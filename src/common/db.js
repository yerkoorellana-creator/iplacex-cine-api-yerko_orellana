import { MongoClient } from 'mongodb';
import dns from 'dns';

// Forzar el uso de DNS públicas para resolver registros SRV en Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = "mongodb+srv://yerkoorellana_db_user:C9lthKqQ6pj9RHc8@eva-u3-express.pqlm7hz.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri);
export const dbName = "cine-db";

export async function connectDB() {
  try {
    await client.connect();
    console.log("Conexión exitosa al clúster de MongoDB Atlas");
    return client.db(dbName);
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas:", error);
    process.exit(1);
  }
}