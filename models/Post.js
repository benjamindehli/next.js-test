class Post {
    constructor(
        id,
        orderNumber,
        copyright,
        timestamp,
        slug,
        title,
        content,
        thumbnailDescription,
        thumbnailFilename,
        link
    ) {
        this.id = id || null;
        this.orderNumber = orderNumber || 0;
        this.copyright = copyright || false;
        this.timestamp = timestamp || null;
        this.slug = slug || {
            no: null,
            en: null
        };
        this.title = title || {
            no: null,
            en: null
        };
        this.content = content || {
            no: null,
            en: null
        };
        this.thumbnailDescription = thumbnailDescription;
        this.thumbnailFilename = thumbnailFilename;
        this.link = link;
    }
}

export default Post;
