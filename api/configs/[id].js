import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "calculadora3dmongodb";
const collectionName = "configs";

export default async function handler(req, res) {
  const { id } = req.query;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  if (req.method === "GET") {
    const config = await collection.findOne({ _id: new ObjectId(id) });
    if (!config) return res.status(404).json({ error: "No encontrada" });
    res.status(200).json(config);
  } else if (req.method === "DELETE") {
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ ok: true });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
  await client.close();
}