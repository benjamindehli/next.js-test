// Dependencies
import { server } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { MongoClient } from "mongodb";

// Config
import { dbConnectionString } from "config";

// Components
import PostForm from "components/admin/postForm";

// Helpers
import { convertToUrlFriendlyString } from "helpers/urlFormatter";
import { getAllInCollection } from "helpers/databaseHelpers";

// Assets

const Posts = (props) => {
  const router = useRouter();
  const locale = router.locale;

  const handleAddPost = async (post) => {
    const fetchUrl = "/api/posts";
    const fetchOptions = {
      method: "POST",
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
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(fetchUrl, fetchOptions);
    await response.json();
  };

  return (
    <div>
      <button onClick={handleAddPost}></button>
      {props.posts.map((post) => {
        const postId = convertToUrlFriendlyString(post.title[locale]);
        return (
          <PostForm key={postId} post={post} onUpdatePost={handleUpdatePost} />
        );
      })}
    </div>
  );
};

export default Posts;

export const getStaticProps = async () => {
  const client = await MongoClient.connect(dbConnectionString);
  const posts = await getAllInCollection(client, "posts");

  return {
    props: {
      posts,
    },
  };
};
