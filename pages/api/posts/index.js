// Dependencies
import { MongoClient } from "mongodb";

// Config
import { dbConnectionString } from "config";

// Data
import posts from "data/posts/data/all.json";

// Helpers
import { convertToUrlFriendlyString } from "helpers/urlFormatter";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(dbConnectionString);
    const db = client.db();

    const postsCollection = db.collection("posts");

    const result = await postsCollection.insertOne(data);

    client.close();

    res.status(201).json(result);
  }
  if (req.method === "GET") {
    if (req.query.slug?.length && req.query.slugLocale?.length) {
      const post = posts.find((post) => {
        return (
          req.query.slug ===
          convertToUrlFriendlyString(post.title[req.query.slugLocale])
        );
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
