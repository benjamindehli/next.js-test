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

const EquipmentItem = (props) => {
    const router = useRouter();

    const { locale, defaultLocale } = router;

    const languageSlug = getLocaleSlug(locale, defaultLocale);

    const link = {
        to: `/${languageSlug}equipment/${props.equipmentTypeSlug}/${props.equipmentItem.slug}/`,
        title: props.equipmentItem.title?.[locale]
    };

    const renderEquipmentItemThumbnail = () => {
        const filename = props.equipmentItem.thumbnailFilename + "_945.jpg";
        const imageProps = {
            priority: !!props.fulscreen,
            sizes: !!props.fullscreen ? "945" : "(max-width: 599px) 55px, 350px"
        };
        return (
            <ListItemThumbnail fullscreen={props.fullscreen} link={link}>
                <Image
                    {...imageProps}
                    width={props.fullscreen ? "540" : "350"}
                    height={props.fullscreen ? "400" : "260"}
                    quality="60"
                    src={`/images/equipment/${props.equipmentTypeSlug}/${filename}`}
                    alt={`${props.equipmentItem.brand} ${props.equipmentItem.model}`}
                />
            </ListItemThumbnail>
        );
    };

    return (
        <Fragment>
            {renderEquipmentItemThumbnail()}
            <ListItemContent fullscreen={props.fullscreen}>
                <ListItemContentHeader fullscreen={props.fullscreen} link={link}>
                    <h2>
                        {props.equipmentItem.brand} {props.equipmentItem.model}
                    </h2>
                </ListItemContentHeader>
            </ListItemContent>
        </Fragment>
    );
};

export default EquipmentItem;
