// Helpers
import { getLocaleSlug } from "helpers/urlHelpers";

export default function jsonLd(releases, locale) {
    const localeSlug = getLocaleSlug(locale);
    const releaseItems = releases.map((release, index) => {
        const releaseSlug = release.slug[locale];
        return {
            "@type": "MusicRecording",
            "@id": `https://www.dehlimusikk.no/portfolio/${releaseSlug}/`,
            position: index + 1,
            url: `https://www.dehlimusikk.no/${localeSlug}portfolio/${releaseSlug}/`
        };
    });
    const snippet = {
        "@context": "http://schema.org",
        "@type": "ItemList",
        itemListElement: releaseItems
    };
    return <script type="application/ld+json">{`${JSON.stringify(snippet)}`}</script>;
}
