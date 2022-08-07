// Helpers
import { getLocaleSlug } from "helpers/urlHelpers";

export default function jsonLd(equipmentTypes, locale) {
    const localeSlug = getLocaleSlug(locale);
    const equipmentTypeItems = equipmentTypes.map((equipmentType, index) => {
        const equipmentTypeSlug = equipmentType.slug;
        return {
            "@type": "ListItem",
            position: index + 1,
            url: `https://www.dehlimusikk.no/${localeSlug}equipment/${equipmentTypeSlug}/`
        };
    });
    const snippet = {
        "@context": "http://schema.org",
        "@type": "ItemList",
        itemListElement: equipmentTypeItems
    };
    return <script type="application/ld+json">{`${JSON.stringify(snippet)}`}</script>;
}
