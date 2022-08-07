// Dependencies
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

// Config
import { dbConnectionString } from "config";

// Components
import EquipmentTypeList from "components/partials/EquipmentTypeList";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";
import { getLocaleSlug } from "helpers/urlHelpers";

// JSON-LD
import getEquipmentTypesJsonLd from "json-ld/equipmentTypes";

const EquipmentTypes = (props) => {
    const router = useRouter();
    const { locale } = router;

    const metadata = {
        title: {
            en: "Equipment | Dehli Musikk",
            no: "Utstyr | Dehli Musikk"
        },
        heading: {
            en: "Equipment",
            no: "Utstyr"
        },
        description: {
            en: "Equipment I use during recording",
            no: "Utstyr jeg bruker under innspilling"
        }
    };

    return (
        <Fragment>
            <Head>
                <title>{metadata.title[locale]}</title>
                <meta name="description" content={metadata.description[locale]} />
                <link rel="canonical" href={`https://www.dehlimusikk.no/${props.localeSlug}equipment/`} />
                <link rel="alternate" href={`https://www.dehlimusikk.no/equipment/`} hreflang="no" />
                <link rel="alternate" href={`https://www.dehlimusikk.no/en/equipment/`} hreflang="en" />
                <link rel="alternate" href={`https://www.dehlimusikk.no/equipment/`} hreflang="x-default" />
                <meta property="og:title" content={metadata.heading[locale]} />
                <meta property="og:url" content={`https://www.dehlimusikk.no/${props.localeSlug}equipment/`} />
                <meta property="og:description" content={metadata.description[locale]} />
                <meta property="og:locale" content={locale === "en" ? "en_US" : "no_NO"} />
                <meta property="og:locale:alternate" content={locale === "en" ? "nb_NO" : "en_US"} />
                <meta property="twitter:title" content={metadata.heading[locale]} />
                <meta property="twitter:description" content={metadata.description[locale]} />
                {getEquipmentTypesJsonLd(props.equipmentTypes, locale)}
            </Head>
            <EquipmentTypeList equipmentTypes={props.equipmentTypes} />
        </Fragment>
    );
};

export default EquipmentTypes;

export const getStaticProps = async (context) => {
    const client = await MongoClient.connect(dbConnectionString);
    const equipmentTypes = await getAllInCollection(client, "equipmentTypes").then((equipmentTypes) => {
        return equipmentTypes.map((equipmentType) => {
            return {
                ...equipmentType,
                imageKitPath: `equipment/${equipmentType.thumbnailFilename}_945.jpg`
            };
        });
    });
    client.close();

    const localeSlug = getLocaleSlug(context.locale, context.defaultLocale);

    return {
        props: {
            equipmentTypes,
            localeSlug
        }
    };
};
