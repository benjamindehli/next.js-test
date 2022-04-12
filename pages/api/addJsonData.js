// Dependencies
import { MongoClient } from "mongodb";

// Config
import { dbConnectionString } from "config";

// Models
import Post from "models/Post";


async function handler(req, res) {
    if (req.method === "POST") {
        const posts = req.body;

        const client = await MongoClient.connect(dbConnectionString);
        const db = client.db();

        const postsCollection = db.collection("posts");

        await postsCollection.insertMany(posts);

        client.close();

        res.status(201).json("JSON data for posts added");
    }
}

export default handler;
