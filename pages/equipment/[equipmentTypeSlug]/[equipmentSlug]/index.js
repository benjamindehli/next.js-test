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

// Amp Components
//import AmpPostItem from "components/amp/AmpPostItem";

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
    const arrowLeftLink = props.previousPostSlug?.length
        ? `/${props.localeSlug}equipment/${query.equipmentTypeSlug}/${props.previousPostSlug}/`
        : null;
    const arrowRightLink = props.nextPostSlug?.length ? `/${props.localeSlug}equipment/${query.equipmentTypeSlug}/${props.nextPostSlug}/` : null;

    return (
        <Fragment>
            {/*<Head>{getPostJsonLd(props.post, locale)}</Head>*/}
            {/*
            {isAmp ? (
                <AmpPostItem post={props.post} fullscreen />
            ) : (
                <Fragment>
                    <Modal
                        onClickOutside={handleClickOutside}
                        maxWidth="540px"
                        arrowLeftLink={arrowLeftLink}
                        arrowRightLink={arrowRightLink}
                        selectedLanguageKey={locale}
                    >
                        <PostItem post={props.post} fullscreen />
                    </Modal>
                    <PostList posts={props.posts} blur />
                </Fragment>
            )}
            */}
            <Modal
                onClickOutside={handleClickOutside}
                maxWidth="945px"
                arrowLeftLink={arrowLeftLink}
                arrowRightLink={arrowRightLink}
                selectedLanguageKey={locale}
            >
                <EquipmentItem equipmentItem={props.equipmentItem} equipmentTypeSlug={props.equipmentTypeSlug} fullscreen />
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
    const equipmentItem = await getOneInCollection(
        client,
        context.params.equipmentTypeSlug,
        context.params.equipmentSlug
    );
    const equipmentTypeSlug = context.params.equipmentTypeSlug;
    const equipmentItems = await getAllInCollection(client, context.params.equipmentTypeSlug);
    client.close();

    const slugForNeighbourItems = getSlugForNeighbourItems(equipmentItem, equipmentItems);
    const localeSlug = getLocaleSlug(context.locale, context.defaultLocale);

    return {
        props: {
            equipmentItems,
            equipmentItem,
            equipmentTypeSlug,
            previousPostSlug: slugForNeighbourItems.previousItemSlug,
            nextPostSlug: slugForNeighbourItems.nextItemSlug,
            localeSlug
        }
    };
};
