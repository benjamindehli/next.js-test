// Dependencies
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

// Config
import { dbConnectionString } from "config";

// Components
import EquipmentList from "components/partials/EquipmentList";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";

// JSON-LD
//import getPostsJsonLd from "json-ld/posts";


const EquipmentType = (props) => {
    const router = useRouter();
    const { locale } = router;

    return (
        <Fragment>
            {/* <Head>{getPostsJsonLd(props.posts, locale)}</Head> /*}
            {/*{isAmp ? <AmpPostList posts={props.posts} /> : <PostList posts={props.posts} />}*/}
            <EquipmentList equipment={props.equipment} equipmentTypeSlug={props.equipmentTypeSlug} />
        </Fragment>
    );
};

export default EquipmentType;

export async function getStaticPaths({ locales }) {
    const client = await MongoClient.connect(dbConnectionString);
    const equipmentTypes = await getAllInCollection(client, "equipmentTypes");
    client.close();

    const paths = [];

    equipmentTypes.forEach((equipmentType) => {
        locales.forEach((locale) => {
            const equipmentTypeSlug = equipmentType.slug;
            if (equipmentTypeSlug) {
                paths.push({
                    params: { equipmentTypeSlug },
                    locale
                });
            }
        });
    });
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const equipmentTypeSlug = context.params.equipmentTypeSlug;
    const client = await MongoClient.connect(dbConnectionString);
    const equipment = await getAllInCollection(client, equipmentTypeSlug);
    client.close();
    return {
        props: {
            equipment,
            equipmentTypeSlug
        }
    };
};
