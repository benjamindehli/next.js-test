// Dependencies
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

// Config
import { dbConnectionString } from "config";

// Components
import PostList from "components/partials/PostList";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";

const Posts = ({ posts }) => {
  return <PostList posts={posts} />;
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
