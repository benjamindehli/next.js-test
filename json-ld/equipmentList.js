// Helpers
import { getLocaleSlug } from "helpers/urlHelpers";

export default function jsonLd(equipmentList, equipmentTypeSlug, locale) {
    const localeSlug = getLocaleSlug(locale);
    const equipmentItems = equipmentList.map((equipment, index) => {
        const equipmentSlug = equipment.slug;
        return {
            "@type": "ListItem",
            position: index + 1,
            url: `https://www.dehlimusikk.no/${localeSlug}equipment/${equipmentTypeSlug}/${equipmentSlug}`
        };
    });
    const snippet = {
        "@context": "http://schema.org",
        "@type": "ItemList",
        itemListElement: equipmentItems
    };
    return <script type="application/ld+json">{`${JSON.stringify(snippet)}`}</script>;
}
