// Dependencies
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

// Config
import { dbConnectionString } from "config";

// Components
import EquipmentTypeList from "components/partials/EquipmentTypeList";
//import AmpPostList from "components/amp/AmpPostList";

// Helpers
import { getAllInCollection } from "helpers/databaseHelpers";

// JSON-LD
//import getPostsJsonLd from "json-ld/posts";


const EquipmentTypes = (props) => {
    const router = useRouter();
    const { locale } = router;

    return (
        <Fragment>
           {/* <Head>{getPostsJsonLd(props.posts, locale)}</Head> /*}
            {/*{isAmp ? <AmpPostList posts={props.posts} /> : <PostList posts={props.posts} />}*/}
            <EquipmentTypeList equipmentTypes={props.equipmentTypes} />
        </Fragment>
    );
};

export default EquipmentTypes;

export const getStaticProps = async () => {
    const client = await MongoClient.connect(dbConnectionString);
    const equipmentTypes = await getAllInCollection(client, "equipmentTypes");
    client.close();
    return {
        props: {
            equipmentTypes
        }
    };
};
