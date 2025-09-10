import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "calculadora3dmongodb";
const collectionName = "configs";

export default async function handler(req, res) {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // URL de tu frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    switch (req.method) {
      case 'GET':
        const configs = await collection.find().sort({ createdAt: -1 }).toArray();
        res.status(200).json(configs);
        break;
      case 'POST':
        const config = { ...req.body, createdAt: new Date() };
        await collection.insertOne(config);
        res.status(201).json(config);
        break;
      default:
        res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}