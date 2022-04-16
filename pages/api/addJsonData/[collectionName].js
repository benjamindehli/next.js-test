// Dependencies
import { MongoClient } from "mongodb";

// Config
import { dbConnectionString } from "config";

async function handler(req, res) {
    if (req.method === "POST") {
        const collectionName = req.query.collectionName;
        const documents = req.body;

        const client = await MongoClient.connect(dbConnectionString);
        const db = client.db();

        const collection = db.collection(collectionName);

        await collection.insertMany(documents);

        client.close();

        res.status(201).json(`JSON data for ${collectionName} added`);
    }
}

export default handler;
