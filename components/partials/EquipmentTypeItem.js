// Dependencies
import { Fragment } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Components
import ListItemThumbnail from "components/template/List/ListItem/ListItemThumbnail";
import ListItemContent from "components/template/List/ListItem/ListItemContent";
import ListItemContentHeader from "components/template/List/ListItem/ListItemContent/ListItemContentHeader";

// Helpers
import { getLocaleSlug } from "helpers/urlHelpers";

const EquipmentTypeItem = (props) => {
    const router = useRouter();

    const { locale, defaultLocale } = router;

    const languageSlug = getLocaleSlug(locale, defaultLocale);

    const link = {
        to: `/${languageSlug}equipment/${props.equipmentType.slug}/`,
        title: props.equipmentType.title?.[locale]
    };

   

    const renderEquipmentTypeThumbnail = () => {
        const filename = props.equipmentType.thumbnailFilename + "_945.jpg";
        const imageProps = {
            priority: true,
            sizes: "(max-width: 599px) 55px, 350px"
        };
        return (
            <ListItemThumbnail link={link}>
                <Image
                    {...imageProps}
                    width="350"
                    height="260"
                    quality="60"
                    src={`/images/equipment/${filename}`}
                    alt={props.equipmentType.thumbnailDescription}
                />
            </ListItemThumbnail>
        );
    };

    return (
        <Fragment>
            {renderEquipmentTypeThumbnail()}
            <ListItemContent>
                <ListItemContentHeader link={link}>
                    <h2>{props.equipmentType.title?.[locale]}</h2>
                </ListItemContentHeader>
            </ListItemContent>
        </Fragment>
    );
};

export default EquipmentTypeItem;
