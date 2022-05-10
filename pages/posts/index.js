// Dependencies
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

// Config
import { dbConnectionString } from "config";

// Components
import PostList from "components/partials/PostList";
import Container from "components/template/Container";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";
import { getLocaleSlug } from "helpers/urlHelpers";

// JSON-LD
import getPostsJsonLd from "json-ld/posts";

const Posts = (props) => {
    const router = useRouter();
    const { locale } = router;

    const metadata = {
        title: {
            en: "Posts | Dehli Musikk",
            no: "Innlegg | Dehli Musikk"
        },
        heading: {
            en: "Posts",
            no: "Innlegg"
        },
        description: {
            en: "Latest update from Dehli Musikk",
            no: "Siste oppdateringer fra Dehli Musikk"
        }
    };

    return (
        <Fragment>
            <Head>
                <title>{metadata.title[locale]}</title>
                <meta name="description" content={metadata.description[locale]} />
                <link rel="canonical" href={`https://www.dehlimusikk.no/${props.localeSlug}posts/`} />
                <link rel="alternate" href={`https://www.dehlimusikk.no/posts/`} hreflang="no" />
                <link rel="alternate" href={`https://www.dehlimusikk.no/en/posts/`} hreflang="en" />
                <link rel="alternate" href={`https://www.dehlimusikk.no/posts/`} hreflang="x-default" />
                <meta property="og:title" content={metadata.heading[locale]} />
                <meta property="og:url" content={`https://www.dehlimusikk.no/${props.localeSlug}posts/`} />
                <meta property="og:description" content={metadata.description[locale]} />
                <meta property="og:locale" content={locale === "en" ? "en_US" : "no_NO"} />
                <meta property="og:locale:alternate" content={locale === "en" ? "nb_NO" : "en_US"} />
                <meta property="twitter:title" content={metadata.heading[locale]} />
                <meta property="twitter:description" content={metadata.description[locale]} />
                {getPostsJsonLd(props.posts, locale)}
            </Head>
            <Container>
                <h1>{metadata.heading[locale]}</h1>
                <p>{locale === "en" ? "Updates from Dehli Musikk" : "Oppdateringer fra Dehli Musikk"}</p>
                <PostList posts={props.posts} />
            </Container>
        </Fragment>
    );
};

export default Posts;

export const getStaticProps = async (context) => {
    const client = await MongoClient.connect(dbConnectionString);
    const posts = await getAllInCollection(client, "posts").then((posts) => {
        return posts.map((post) => {
            return {
                ...post,
                postImageKitPath: `posts/${post.thumbnailFilename}_540.jpg`
            };
        });
    });
    client.close();

    const localeSlug = getLocaleSlug(context.locale, context.defaultLocale);

    return {
        props: {
            posts,
            localeSlug
        }
    };
};
