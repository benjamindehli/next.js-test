// Dependencies
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

// Config
import { dbConnectionString } from "config";

// Componets
import EquipmentItem from "components/partials/EquipmentItem";
import EquipmentList from "components/partials/EquipmentList";
import Modal from "components/template/Modal";

// Helpers
import { getOneInCollection, getAllInCollection } from "helpers/databaseHelpers";
import { getLocaleSlug, getSlugForNeighbourItems } from "helpers/urlHelpers";

// JSON-LD
//import getPostJsonLd from "json-ld/post";
import Head from "next/head";

const EquipmentTypeItem = (props) => {
    const router = useRouter();
    const { locale, query } = router;

    const handleClickOutside = () => {
        router.push(`/${props.localeSlug}equipment/${query.equipmentTypeSlug}/`);
    };
    const arrowLeftLink = props.previousEquipmentSlug?.length
        ? `/${props.localeSlug}equipment/${query.equipmentTypeSlug}/${props.previousEquipmentSlug}/`
        : null;
    const arrowRightLink = props.nextEquipmentSlug?.length
        ? `/${props.localeSlug}equipment/${query.equipmentTypeSlug}/${props.nextEquipmentSlug}/`
        : null;

    return (
        <Fragment>
            {/*<Head>{getPostJsonLd(props.post, locale)}</Head>*/}

            <Modal
                onClickOutside={handleClickOutside}
                maxWidth="945px"
                arrowLeftLink={arrowLeftLink}
                arrowRightLink={arrowRightLink}
                selectedLanguageKey={locale}
            >
                <EquipmentItem
                    equipmentItem={props.equipmentItem}
                    equipmentTypeSlug={props.equipmentTypeSlug}
                    fullscreen
                />
            </Modal>
            <EquipmentList equipment={props.equipmentItems} equipmentTypeSlug={props.equipmentTypeSlug} blur />
        </Fragment>
    );
};

export default EquipmentTypeItem;

export async function getStaticPaths({ locales }) {
    const client = await MongoClient.connect(dbConnectionString);
    const equipmentTypes = await getAllInCollection(client, "equipmentTypes");

    const equipmentItemsByType = equipmentTypes.map((equipmentType) => {
        return getAllInCollection(client, equipmentType.slug, { equipmentTypeSlug: equipmentType.slug });
    });

    return Promise.all(equipmentItemsByType).then((equipmentItemsForType) => {
        client.close();

        const paths = [];
        equipmentItemsForType.forEach((equipmentItems) => {
            equipmentItems.forEach((equipmentItem) => {
                locales.forEach((locale) => {
                    const equipmentTypeSlug = equipmentItem.equipmentTypeSlug;
                    const equipmentSlug = equipmentItem.slug;
                    if (equipmentTypeSlug) {
                        paths.push({
                            params: { equipmentTypeSlug, equipmentSlug },
                            locale
                        });
                    }
                });
            });
        });

        return { paths, fallback: false };
    });
}

export const getStaticProps = async (context) => {
    const client = await MongoClient.connect(dbConnectionString);
    const equipmentTypeSlug = context.params.equipmentTypeSlug;
    const equipmentSlug = context.params.equipmentSlug;

    const equipmentItem = await getOneInCollection(client, equipmentTypeSlug, equipmentSlug).then((equipmentItem) => {
        return {
            ...equipmentItem,
            imageKitPath: `equipment/${context.params.equipmentTypeSlug}/${equipmentItem.thumbnailFilename}_945.jpg`
        };
    });
    const equipmentItems = await getAllInCollection(client, equipmentTypeSlug).then((equipmentItems) => {
        return equipmentItems.map((equipmentItem) => {
            return {
                ...equipmentItem,
                imageKitPath: `equipment/${equipmentTypeSlug}/${equipmentItem.thumbnailFilename}_945.jpg`
            };
        });
    });
    client.close();

    console.log({ equipmentItems });

    const slugForNeighbourItems = getSlugForNeighbourItems(equipmentItem, equipmentItems);
    const localeSlug = getLocaleSlug(context.locale, context.defaultLocale);

    return {
        props: {
            equipmentItems,
            equipmentItem,
            equipmentTypeSlug,
            previousEquipmentSlug: slugForNeighbourItems.previousItemSlug,
            nextEquipmentSlug: slugForNeighbourItems.nextItemSlug,
            localeSlug
        }
    };
};
