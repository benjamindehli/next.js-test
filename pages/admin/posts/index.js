// Dependencies
import { MongoClient } from "mongodb";

// Config
import { isProduction, dbConnectionString } from "config";

// Components
import PostForm from "components/admin/postForm";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";

const Posts = (props) => {
    const handleAddPost = async () => {
        const fetchUrl = "/api/posts";
        const fetchOptions = {
            method: "POST"
        };
        const response = await fetch(fetchUrl, fetchOptions);
        await response.json();
    };

    const handleUpdatePost = async (post) => {
        const fetchUrl = `/api/posts/${post._id}`;
        console.log("post");
        const fetchOptions = {
            method: "PUT",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(fetchUrl, fetchOptions);
        await response.json();
    };

    return (
        <div>
            <button onClick={handleAddPost}>Add post</button>
            {props.posts.map((post) => {
                return <PostForm key={post._id} post={post} onUpdatePost={handleUpdatePost} />;
            })}
        </div>
    );
};

export default Posts;

export const getStaticProps = async () => {
    if (isProduction) {
        return { notFound: true };
    }
    const client = await MongoClient.connect(dbConnectionString);
    const posts = await getAllInCollection(client, "posts");
    client.close();
    return {
        props: {
            posts
        }
    };
};
