// Dependencies
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

// Config
import { dbConnectionString } from "config";

// Componets
import PostItem from "components/partials/PostItem";
import PostList from "components/partials/PostList";
import Modal from "components/template/Modal";
import Container from "components/template/Container";

// Helpers
import { getOneInCollection, getAllInCollection } from "helpers/databaseHelpers";
import { getLocaleSlug, getSlugForNeighbourItems } from "helpers/urlHelpers";

// JSON-LD
import getPostJsonLd from "json-ld/post";
import Head from "next/head";

const Post = (props) => {
    const router = useRouter();
    const { locale } = router;

    const metadata = {
        title: {
            en: `${props.post.title.en} - Posts | Dehli Musikk`,
            no: `${props.post.title.no} - Innlegg | Dehli Musikk`
        },
        heading: {
            en: props.post.title.en,
            no: props.post.title.no
        },
        description: {
            en: props.post.content.en,
            no: props.post.content.no
        }
    };

    const handleClickOutside = () => {
        router.push(`/${props.localeSlug}posts/`);
    };
    const arrowLeftLink = props.previousPostSlug?.[locale]?.length
        ? `/${props.localeSlug}posts/${props.previousPostSlug[locale]}/`
        : null;
    const arrowRightLink = props.nextPostSlug?.[locale]?.length
        ? `/${props.localeSlug}posts/${props.nextPostSlug[locale]}/`
        : null;

    return (
        <Fragment>
            <Head>
                <title>{metadata.title[locale]}</title>
                <meta name="description" content={metadata.description[locale]} />
                <link
                    rel="canonical"
                    href={`https://www.dehlimusikk.no/${props.localeSlug}posts/${props.post.slug[locale]}`}
                />
                <link rel="alternate" href={`https://www.dehlimusikk.no/posts/${props.post.slug.no}`} hreflang="no" />
                <link
                    rel="alternate"
                    href={`https://www.dehlimusikk.no/en/posts/${props.post.slug.en}`}
                    hreflang="en"
                />
                <link
                    rel="alternate"
                    href={`https://www.dehlimusikk.no/posts/${props.post.slug.no}`}
                    hreflang="x-default"
                />
                <meta property="og:title" content={metadata.heading[locale]} />
                <meta
                    property="og:url"
                    content={`https://www.dehlimusikk.no/${props.localeSlug}posts/${props.post.slug[locale]}`}
                />
                <meta property="og:description" content={metadata.description[locale]} />
                <meta property="og:locale" content={locale === "en" ? "en_US" : "no_NO"} />
                <meta property="og:locale:alternate" content={locale === "en" ? "nb_NO" : "en_US"} />
                <meta property="twitter:title" content={metadata.heading[locale]} />
                <meta property="twitter:description" content={metadata.description[locale]} />
                {getPostJsonLd(props.post, locale)}
            </Head>
            <Modal
                onClickOutside={handleClickOutside}
                maxWidth="540px"
                arrowLeftLink={arrowLeftLink}
                arrowRightLink={arrowRightLink}
                selectedLanguageKey={locale}
            >
                <PostItem post={props.post} fullscreen />
            </Modal>
            <Container blur>
                <h1>{metadata.heading[locale]}</h1>
                <p>{locale === "en" ? "Updates from Dehli Musikk" : "Oppdateringer fra Dehli Musikk"}</p>
                <PostList posts={props.posts} />
            </Container>
        </Fragment>
    );
};

export default Post;

export async function getStaticPaths({ locales }) {
    const client = await MongoClient.connect(dbConnectionString);
    const posts = await getAllInCollection(client, "posts");
    client.close();

    const paths = [];

    posts.forEach((post) => {
        locales.forEach((locale) => {
            const postSlug = post.slug?.[locale];
            if (postSlug) {
                paths.push({
                    params: { postSlug },
                    locale
                });
            }
        });
    });
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const client = await MongoClient.connect(dbConnectionString);
    const post = await getOneInCollection(client, "posts", context.params.postSlug, context.locale).then((post) => {
        return {
            ...post,
            imageKitPath: `posts/${post.thumbnailFilename}_540.jpg`
        };
    });

    const posts = await getAllInCollection(client, "posts").then((posts) => {
        return posts.map((post) => {
            return {
                ...post,
                imageKitPath: `posts/${post.thumbnailFilename}_540.jpg`
            };
        });
    });
    client.close();

    const slugForNeighbourItems = getSlugForNeighbourItems(post, posts, context.locale);
    const localeSlug = getLocaleSlug(context.locale, context.defaultLocale);

    return {
        props: {
            posts,
            post,
            previousPostSlug: slugForNeighbourItems.previousItemSlug,
            nextPostSlug: slugForNeighbourItems.nextItemSlug,
            localeSlug
        }
    };
};
