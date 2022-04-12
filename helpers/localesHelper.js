export const getLocaleName = (locale, nameLocale) => {
    const localeNames = {
        en: {
            en: 'english',
            no: 'engelsk'
        },
        no: {
            en: 'norwegian',
            no: 'norsk'
        }
    }
    return localeNames?.[locale]?.[nameLocale];
};