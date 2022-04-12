// Helpers
import { getLocaleSlug } from "helpers/urlHelpers";

export default function jsonLd(posts, locale) {
    const localeSlug = getLocaleSlug(locale);
    const postItems = posts.map((post, index) => {
        const postSlug = post.slug[locale];
        return {
            "@type": "ListItem",
            "@id": `https://www.dehlimusikk.no/${localeSlug}posts/${postSlug}/`,
            position: index + 1,
            url: `https://www.dehlimusikk.no/${localeSlug}posts/${postSlug}/`
        };
    });
    const snippet = {
        "@context": "http://schema.org",
        "@type": "ItemList",
        itemListElement: postItems
    };
    return <script type="application/ld+json">{`${JSON.stringify(snippet)}`}</script>;
}
