// Dependencies
import { MongoClient } from "mongodb";
import { useAmp } from "next/amp";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

// Config
import { dbConnectionString } from "config";

// Components
import PostList from "components/partials/PostList";
import AmpPostList from "components/amp/AmpPostList";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";

// JSON-LD
import getPostsJsonLd from "json-ld/posts";

export const config = { amp: "hybrid" };

const Posts = (props) => {
    const isAmp = useAmp();
    const router = useRouter();
    const { locale } = router;

    return (
        <Fragment>
            <Head>{getPostsJsonLd(props.posts, locale)}</Head>
            {isAmp ? <AmpPostList posts={props.posts} /> : <PostList posts={props.posts} />}
        </Fragment>
    );
};

export default Posts;

export const getStaticProps = async () => {
    const client = await MongoClient.connect(dbConnectionString);
    const posts = await getAllInCollection(client, "posts");
    client.close();
    return {
        props: {
            posts
        }
    };
};
