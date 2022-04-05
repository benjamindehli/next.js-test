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

// Helpers
import { getOneInCollection, getAllInCollection } from "helpers/databaseHelpers";
import { getLocaleSlug, getSlugForNeighbourItems } from "helpers/urlHelpers";

const Post = (props) => {
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
    );
};

export default Post;

// This function gets called at build time
export async function getStaticPaths({ locales }) {
    const client = await MongoClient.connect(dbConnectionString);
    const posts = await getAllInCollection(client, "posts");
    client.close();

    // Get the paths we want to pre-render based on posts
    const paths = [];

    posts.forEach((post) => {
        locales.forEach((locale) => {
            const slug = post.slug?.[locale];
            if (slug) {
                paths.push({
                    params: { slug },
                    locale
                });
            }
        });
    });

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const client = await MongoClient.connect(dbConnectionString);
    const post = await getOneInCollection(client, "posts", context.params.slug, context.locale);
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
