export const getAllInCollection = async (client, collectionName) => {
  const db = client.db();
  const postsCollection = db.collection(collectionName);
  const posts = await postsCollection.find().toArray();
  return posts.map((post) => {
    return {
      ...post,
      _id: post._id.toString(),
    };
  });
};

export const getOneInCollection = async (
  client,
  collectionName,
  slug,
  locale
) => {
  const db = client.db();
  const postsCollection = db.collection(collectionName);
  const slugKey = locale ? `slug.${locale}` : "slug";
  const post = await postsCollection.findOne({ [slugKey]: slug });
  return post
    ? {
        ...post,
        _id: post._id.toString(),
      }
    : null;
};

export const replaceOneInCollection = async (
  client,
  collectionName,
  objectId,
  data
) => {
  data = {
    ...data,
    _id: objectId,
  };
  const db = client.db();
  const postsCollection = db.collection(collectionName);
  const result = await postsCollection.replaceOne({ _id: data._id }, data);
  return result;
};
