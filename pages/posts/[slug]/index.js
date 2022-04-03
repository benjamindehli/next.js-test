// Dependencies
import { Fragment } from "react";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

// Config
import { server, dbConnectionString } from "config";

// Componets
import PostItem from "components/partials/PostItem";
import PostList from "components/partials/PostList";

// Helpers
import { convertToUrlFriendlyString } from "helpers/urlFormatter";
import { getOneInCollection, getAllInCollection } from "helpers/databaseHelpers";

const Post = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      <PostItem post={props.post} />
      <PostList posts={props.posts} />
    </Fragment>
  );
};

export default Post;

// This function gets called at build time
export async function getStaticPaths({ locales }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`${server}/api/posts`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = [];

  posts.forEach((post) => {
    locales.forEach((locale) => {
      const slug = convertToUrlFriendlyString(post.title[locale]);
      paths.push({
        params: { slug },
        locale,
      });
    });
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
  const client = await MongoClient.connect(dbConnectionString);
  const post = await getOneInCollection(
    client,
    "posts",
    context.params.slug,
    context.locale
  );
  const posts = await getAllInCollection(client, "posts");
  client.close();



  /*const req = await fetch(
    `${server}/api/posts?slug=${context.params.slug}&slugLocale=${context.locale}`
  );
  const post = await req.json();*/
  return {
    props: {
      posts,
      post,
    },
  };
};
