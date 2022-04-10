// Dependencies
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Components
import { getLocaleSlug } from "helpers/urlHelpers";
import { getPrettyDate } from "helpers/dateFormatter";

const PostItem = (props) => {
    const router = useRouter();

    const { locale, defaultLocale } = router;

    const postDate = new Date(props.post.timestamp);

    const languageSlug = getLocaleSlug(locale, defaultLocale);

    const link = {
        to: `/${languageSlug}posts/${props.post.slug?.[locale]}/`,
        title: props.post.title?.[locale]
    };

    const renderContentLink = () => {
        const contentLink = props.post.link;
        return contentLink.internal ? (
            <a href={`/${languageSlug}${contentLink.url?.[locale]}?amp=1`} title={contentLink.text?.[locale]}>
                {contentLink.text?.[locale]}
            </a>
        ) : (
            <a href={contentLink.url} target="_blank" rel="noopener noreferrer" title={contentLink.text?.[locale]}>
                {contentLink.text?.[locale]}
            </a>
        );
    };

    const renderPostThumbnail = () => {
        const filename = props.post.thumbnailFilename + "_540.jpg";
        return (
            <amp-img
                layout="responsive"
                width="540"
                height="400"
                src={`/images/posts/${filename}`}
                alt={props.post.thumbnailDescription}
            />
        );
    };

    return (
        <Fragment>
            <Head>
                <script
                    async
                    custom-element="amp-timeago"
                    src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"
                ></script>
            </Head>
            {props.fullscreen ? <h1>{props.post.title?.[locale]}</h1> : null}
            {renderPostThumbnail()}
            {!props.fullscreen ? (
                <a href={link.to} title={link.title}>
                    <h2>{props.post.title?.[locale]}</h2>
                </a>
            ) : null}

            <amp-timeago
                width="0"
                locale="nb-NO"
                height="15"
                datetime={new Date(postDate).toJSON()}
                layout="responsive"
            >
                {getPrettyDate(postDate, locale)}
            </amp-timeago>
            <p>
                {props.post.content?.[locale]?.split("\n")?.map((paragraph, key) => {
                    return <p key={key}>{paragraph}</p>;
                })}
            </p>
            {props.post.link && props.fullscreen ? renderContentLink() : null}
        </Fragment>
    );
};

export default PostItem;
