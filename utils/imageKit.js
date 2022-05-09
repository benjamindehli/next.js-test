import { Fragment } from "react";
import { imageKitUrlEndpoint } from "config";
import imageConfigs from "config/images";

export const getImageKitPath = (src, contentType, formatKey, width) => {
    const imageFormatConfig = imageConfigs?.[contentType]?.formats.find(format => {
        return format.formatKey === formatKey;
    })
    const imageSizeConfig = imageConfigs?.[contentType]?.sizes?.find((size) => {
        return size.width === width;
    });

    if (imageFormatConfig && imageSizeConfig) {
        const params = [`w-${imageSizeConfig.width}`, `h-${imageSizeConfig.height}`, `f-${formatKey}`];
        if (imageSizeConfig.maintainRatio) {
            params.push("c-maintain_ratio");
        }
        const paramsString = params.join(",");
        return `${imageKitUrlEndpoint}/${src}?tr=${paramsString}`;
    } else {
        return null
    }

    
};

export const renderThumbnail = (src, contentType, altText, renderSize) => {
    const sourceElements = imageConfigs[contentType]?.formats?.map((format) => {
        const srcSetArray = imageConfigs[contentType]?.sizes.map((size) => {
            return `${getImageKitPath(src, contentType, format.formatKey, size.width)} ${size.width}w`;
        });
        const srcSetString = srcSetArray.join(", ");
        return (
            <source
                key={format.formatKey}
                sizes={renderSize}
                srcSet={srcSetString}
                type={format.mimeType}
            />
        );
    });
    const defaultImageFormatConfig = imageConfigs[contentType]?.defaultFormat;
    const defaultImageSizeConfig = imageConfigs[contentType]?.defaultSize;
    const defaultImagePath = getImageKitPath(src, contentType, defaultImageFormatConfig?.formatKey, defaultImageSizeConfig?.width)
    return (
        <Fragment>
            {sourceElements}
            <img loading="lazy" src={defaultImagePath} width={defaultImageSizeConfig?.width} height={defaultImageSizeConfig?.height} alt={altText} />
        </Fragment>
    );
};
