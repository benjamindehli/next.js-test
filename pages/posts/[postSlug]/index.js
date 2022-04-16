// Dependencies
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useAmp } from "next/amp";

// Config
import { dbConnectionString } from "config";

// Componets
import PostItem from "components/partials/PostItem";
import PostList from "components/partials/PostList";
import Modal from "components/template/Modal";

// Amp Components
import AmpPostItem from "components/amp/AmpPostItem";

// Helpers
import { getOneInCollection, getAllInCollection } from "helpers/databaseHelpers";
import { getLocaleSlug, getSlugForNeighbourItems } from "helpers/urlHelpers";

// JSON-LD
import getPostJsonLd from "json-ld/post";
import Head from "next/head";

export const config = { amp: "hybrid" };

const Post = (props) => {
    const isAmp = useAmp();

    const router = useRouter();
    const { locale } = router;

    const handleClickOutside = () => {
        router.push(`/${props.localeSlug}posts/`);
    };
    const arrowLeftLink = props.previousPostSlug?.length
        ? `/${props.localeSlug}posts/${props.previousPostSlug}/`
        : null;
    const arrowRightLink = props.nextPostSlug?.length ? `/${props.localeSlug}posts/${props.nextPostSlug}/` : null;

    return (
        <Fragment>
            <Head>{getPostJsonLd(props.post, locale)}</Head>
            {isAmp ? (
                <AmpPostItem post={props.post} fullscreen />
            ) : (
                <Fragment>
                    <Modal
                        onClickOutside={handleClickOutside}
                        maxWidth="540px"
                        arrowLeftLink={arrowLeftLink}
                        arrowRightLink={arrowRightLink}
                        selectedLanguageKey={locale}
                    >
                        <PostItem post={props.post} fullscreen />
                    </Modal>
                    <PostList posts={props.posts} blur />
                </Fragment>
            )}
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
    const post = await getOneInCollection(client, "posts", context.params.postSlug, context.locale);
    const posts = await getAllInCollection(client, "posts");
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