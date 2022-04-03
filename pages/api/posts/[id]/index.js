// Dependencies
import { MongoClient, ObjectId } from "mongodb";

// Config
import { dbConnectionString } from "config";

// Helpers
import { replaceOneInCollection } from "helpers/databaseHelpers";

import posts from "data/posts/data/all.json";

async function handler(req, res) {
  if (req.method === "GET") {
    res
      .status(200)
      .json(posts)
      .find((post) => {
        const postSlug = convertToUrlFriendlyString(post.title[locale]);
        const querySlug = convertToUrlFriendlyString(post.title[locale]);
        return post.id === req.query.id;
      });
  }

  if (req.method === "PUT") {
    const data = req.body;
    const objectId = ObjectId(req.body._id);
    const client = await MongoClient.connect(dbConnectionString);
    const result = await replaceOneInCollection(client, "posts", objectId, data);
    res.status(200).json(result);
    client.close();
  }
}

export default handler;
