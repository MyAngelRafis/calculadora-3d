import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "calculadora3dmongodb";
const collectionName = "configs";

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  if (req.method === "GET") {
    const configs = await collection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(configs);
  } else if (req.method === "POST") {
    const config = { ...req.body, createdAt: new Date() };
    await collection.insertOne(config);
    res.status(201).json(config);
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
  await client.close();
}