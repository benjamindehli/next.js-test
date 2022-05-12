export const getAllInCollection = async (client, collectionName, extraProps) => {
    const db = client.db();
    const itemsCollection = db.collection(collectionName);
    const items = await itemsCollection.find().toArray();
    return items.map((item) => {
        return {
            ...item,
            _id: item._id.toString(),
            ...extraProps
        };
    });
};

export const getOneInCollection = async (client, collectionName, slug, locale) => {
    const db = client.db();
    const itemsCollection = db.collection(collectionName);
    const slugKey = locale ? `slug.${locale}` : "slug";
    const item = await itemsCollection.findOne({ [slugKey]: slug });
    return item
        ? {
              ...item,
              _id: item._id.toString()
          }
        : null;
};

export const replaceOneInCollection = async (client, collectionName, objectId, data) => {
    data = {
        ...data,
        _id: objectId
    };
    const db = client.db();
    const itemsCollection = db.collection(collectionName);
    const result = await itemsCollection.replaceOne({ _id: data._id }, data);
    return result;
};
