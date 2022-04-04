// Dependencies
import { Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Components
import ListItemThumbnail from "components/template/List/ListItem/ListItemThumbnail";
import ListItemContent from "components/template/List/ListItem/ListItemContent";
import ListItemContentHeader from "components/template/List/ListItem/ListItemContent/ListItemContentHeader";
import ListItemContentBody from "components/template/List/ListItem/ListItemContent/ListItemContentBody";
import ListItemActionButtons from "components/template/List/ListItem/ListItemActionButtons";
import Button from "components/template/Button";

// Helpers
import { getLocaleSlug } from "helpers/urlFormatter";
import { getPrettyDate } from "helpers/dateFormatter";

const PostItem = (props) => {
    const router = useRouter();

    const { locale, defaultLocale } = router;

    const postDate = new Date(props.post.timestamp);

    const link = {
        to: `/${locale}/posts/${props.post.slug[locale]}/`,
        title: props.post.title[locale]
    };

    const languageSlug = getLocaleSlug(locale, defaultLocale);

    const renderContentLink = () => {
        const contentLink = props.post.link;
        return contentLink.internal ? (
            <Button href={`/${languageSlug}${contentLink.url[locale]}`} title={contentLink.text[locale]} buttontype="minimal">
                {contentLink.text[locale]}
            </Button>
        ) : (
            <Button href={contentLink.url} target="_blank" rel="noopener noreferrer" title={contentLink.text[locale]}>
                <a>{contentLink.text[locale]}</a>
            </Button>
        );
    };

    const renderPostThumbnail = () => {
        const filename = props.post.thumbnailFilename + "_540.jpg";
        const imageProps = {
          priority: !!props.fulscreen,
          sizes: !!props.fullscreen ? "540px" : "(max-width: 599px) 55px, 350px"
        }
        return <Image {...imageProps} width="540" height="400" quality="60" src={`/images/posts/${filename}`} alt={props.post.thumbnailDescription} />;
    };

    return (
        <Fragment>
            <ListItemThumbnail fullscreen={props.fullscreen} link={link}>
                {renderPostThumbnail()}
            </ListItemThumbnail>
            <ListItemContent fullscreen={props.fullscreen}>
                <ListItemContentHeader fullscreen={props.fullscreen} link={props.link}>
                    <h2>{props.post.title[locale]}</h2>
                    <time dateTime={postDate.toISOString()}>{getPrettyDate(postDate, locale)}</time>
                </ListItemContentHeader>
                <ListItemContentBody fullscreen={props.fullscreen}>
                    {props.post.content[locale].split("\n").map((paragraph, key) => {
                        return <p key={key}>{paragraph}</p>;
                    })}
                </ListItemContentBody>
                {props.post.link && props.fullscreen ? <ListItemActionButtons fullscreen={props.fullscreen}>{renderContentLink()}</ListItemActionButtons> : ""}
            </ListItemContent>
            <h2> {props.post.title[locale]}</h2>
        </Fragment>
    );
};

export default PostItem;
