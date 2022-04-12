// Dependencies
import { MongoClient } from "mongodb";

// Config
import { dbConnectionString } from "config";

// Data
import posts from "data/posts/data/all.json";

// Models
import Post from "models/Post";

// Helpers
import { convertToUrlFriendlyString } from "helpers/urlHelpers";

async function handler(req, res) {
    if (req.method === "POST") {
        console.log("POST");
        const data = req.body || new Post();

        const client = await MongoClient.connect(dbConnectionString);
        const db = client.db();

        const postsCollection = db.collection("posts");

        const response = await postsCollection.insertOne(data);
        const instertedPost = {
            ...data,
            _id: response.insertedId
        };

        client.close();

        res.status(201).json(instertedPost);
    }
    if (req.method === "GET") {
        if (req.query.slug?.length && req.query.slugLocale?.length) {
            const post = posts.find((post) => {
                return req.query.slug === convertToUrlFriendlyString(post.title[req.query.slugLocale]);
            });
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).end("Not Found");
            }
        } else {
            res.status(200).json(posts);
        }
    }
}

export default handler;
