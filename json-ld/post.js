// Helpers
import { getLocaleSlug } from "helpers/urlHelpers";

export default function postJsonLd(post, locale) {
    const localeSlug = getLocaleSlug(locale);
    const postSlug = post.slug[locale];
    const postDate = new Date(post.timestamp).toISOString();
    const postThumbnailPath = `/images/posts/${post.thumbnailFilename}_540.jpg`;

    const snippet = {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "@id": `https://www.dehlimusikk.no/${localeSlug}posts/${postSlug}/`,
        url: `https://www.dehlimusikk.no/${localeSlug}posts/${postSlug}/`,
        author: {
            "@id": "#BenjaminDehli"
        },
        publisher: {
            "@id": "#DehliMusikk"
        },
        headline: post.title[locale],
        inLanguage: locale,
        articleBody: post.content[locale] ? post.content[locale].replace(/\n/g, " ") : "",
        dateCreated: postDate,
        dateModified: postDate,
        datePublished: postDate,
        name: post.title[locale],
        image: {
            "@type": "ImageObject",
            url: `https://www.dehlimusikk.no${postThumbnailPath}`,
            contentUrl: `https://www.dehlimusikk.no${postThumbnailPath}`,
            license: "https://creativecommons.org/licenses/by/4.0/legalcode",
            caption: post.title[locale],
            description: post.thumbnailDescription,
            uploadDate: postDate,
            contentLocation: {
                name: "Dehli Musikk",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bø i Telemark",
                    postalCode: "3804",
                    streetAddress: "Margretes veg 15",
                    addressCountry: {
                        name: "NO"
                    }
                }
            }
        },
        thumbnailUrl: `https://www.dehlimusikk.no${postThumbnailPath}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.dehlimusikk.no"
        }
    };
    if (post.copyright) {
        snippet.image.license = "https://creativecommons.org/licenses/by/4.0/legalcode";
        snippet.image.acquireLicensePage = "https://www.dehlimusikk.no/#contact";
    }
    return <script type="application/ld+json">{`${JSON.stringify(snippet)}`}</script>;
}
