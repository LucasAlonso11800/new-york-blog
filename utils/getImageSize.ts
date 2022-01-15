import { MetadataNames } from "../types/Types";

export const getImageSize = (name: MetadataNames, width: boolean): number => {
    const response = { width: 0, height: 0 };
    switch (name) {
        case MetadataNames.ABOUT_IMAGE: {
            response.width = 400;
            response.height = 400;
        };
            break
        case MetadataNames.HEADER_IMAGE: {
            response.width = 705;
            response.height = 106;
        };
            break
        case MetadataNames.HEAD_ICON: {
            response.width = 100;
            response.height = 100;
        }
    }
    return width ? response.width : response.height;
};