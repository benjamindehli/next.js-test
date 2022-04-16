const replaceAndAddSpace = (string, replace, replaceWith) => {
    string = string.replace(new RegExp(`([^s])([${replace}])([^s])`, "ig"), `$1 ${replaceWith} $3`); // Character right before and after
    string = string.replace(new RegExp(`([^s])([${replace}])`, "ig"), `$1 ${replaceWith}`); // Character right before
    string = string.replace(new RegExp(`([${replace}])([^s])`, "ig"), `${replaceWith} $2`); // Character right after
    string = string.replace(new RegExp(`[${replace}]`, "ig"), replaceWith); // No character right before or after

    return string;
};

export const convertToUrlFriendlyString = (string) => {
    if (string) {
        // To lower case
        string = string.toLowerCase();

        // Character replace
        string = replaceAndAddSpace(string, "&", "and");
        string = replaceAndAddSpace(string, "+", "plus");
        string = string.replace(/[æä]/g, "ae");
        string = string.replace(/[øö]/g, "oe");
        string = string.replace(/å/g, "aa");

        // Whitespace replace
        string = string.replace(/( - )/g, "-");
        string = string.replace(/[\s]+/g, "-");

        // Unwated character replace
        string = string.replace(/[^a-z0-9-]+/gi, "");
        string = string.replace(/-{2,}/g, "-");

        // Remove any character before first and after last A-Z or 0-9
        string = string.replace(/^[^A-Z0-9]*|[^a-z0-9]*$/gi, "");

        return string;
    } else {
        return "";
    }
};

export const getLocaleSlug = (locale, defaultLocale) => {
    return locale === defaultLocale ? "" : `${locale}/`;
};

const getItemSlug = (item, locale) => {
    return locale ? item?.slug?.[locale] : item?.slug;
}

export const getSlugForNeighbourItems = (selectedItem, availableItems, locale) => {
    let slugForNeighbourItems = null;
    availableItems.forEach((item, index) => {
        if (item._id === selectedItem._id) {
            slugForNeighbourItems = {
                previousItemSlug: index > 0 ? getItemSlug(availableItems[index - 1]) : null,
                nextItemSlug: index < availableItems.length - 1 ? getItemSlug(availableItems[index + 1]) : null
            };
        }
    });
    return slugForNeighbourItems;
};
