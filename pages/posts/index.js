// Dependencies
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

// Config
import { dbConnectionString } from "config";

// Components
import PostList from "components/partials/PostList";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";

// JSON-LD
import getPostsJsonLd from "json-ld/posts";

const Posts = (props) => {
    const router = useRouter();
    const { locale } = router;

    return (
        <Fragment>
            <Head>{getPostsJsonLd(props.posts, locale)}</Head>
                <title>{metadata.title[locale]}</title>
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
