// Helpers
import { convertToUrlFriendlyString } from "helpers/urlHelpers";

// Data
import posts from "data/posts/data/all.json";

const AddJsonData = (props) => {
    const handleAddPost = async () => {
        console.log("posts", posts);

        const convertedPosts = posts.map((post) => {
            return {
                content: post.content,
                copyright: post.copyright,
                link: post.link,
                orderNumber: post.orderNumber,
                thumbnailDescription: post.thumbnailDescription,
                thumbnailFilename: post.thumbnailFilename,
                timestamp: post.timestamp,
                title: post.title,
                slug: {
                    no: convertToUrlFriendlyString(post.title.no),
                    en: convertToUrlFriendlyString(post.title.en)
                }
            };
        });

        console.log("convertedPosts", convertedPosts.slice(0,10));
        const tenFirstConvertedPosts = convertedPosts.slice(0,10);

        const fetchUrl = "/api/addJsonData";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(tenFirstConvertedPosts),
            headers: {
                "Content-Type": "application/json"
            }
        };
        await fetch(fetchUrl, fetchOptions);
        
    };

    return (
        <div>
            <h1>Add JSON data</h1>
            <button onClick={handleAddPost}>Add posts from json</button>
        </div>
    );
};

export default AddJsonData;
