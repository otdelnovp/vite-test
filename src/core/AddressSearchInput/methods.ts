import axios from 'axios';

export interface IAddressDadataType {
    value: string;
    unrestricted_value: string;
    data?: {
        geo_lat: string;
        geo_lon: string;

        country_iso_code: string;
        country: string;

        fias_id: string;
        house_fias_id: string;

        region: string;
        region_with_type: string;
        city_with_type: string;

        settlement_with_type: string;

        street_with_type: string;

        house_type: string;
        house: string;

        block_type: string;
        block: string;
    };
}

export interface IAddressType {
    FIAS: string | null;
    Latitude: number | null;
    Longitude: number | null;
    PointAddress: string | null;
}

export const emptyAddressData: IAddressType = {
    FIAS: null,
    Latitude: null,
    Longitude: null,
    PointAddress: null,
};

export const prepareAddressData = (dataDadata: IAddressDadataType | null) => {
    const newPointData = { ...emptyAddressData };

    newPointData.PointAddress = dataDadata?.value || '';

    if (dataDadata?.data) {
        newPointData.FIAS = dataDadata.data.fias_id;
        const lat = dataDadata.data.geo_lat ? parseFloat(dataDadata.data.geo_lat) : null;
        const lon = dataDadata.data.geo_lon ? parseFloat(dataDadata.data.geo_lon) : null;
        if (lat && lon) {
            newPointData.Latitude = lat;
            newPointData.Longitude = lon;
        }
    }

    return newPointData;
};

interface IResponseType {
    data: {
        suggestions: IAddressDadataType[];
    };
}

export interface IAddressData {
    value: IAddressDadataType | null;
    inputValue: string;
    loading: boolean;
    options: IAddressDadataType[];
}

const dadata_api_key = 'af399c90c802189b0297bce99952da444f4fbc5d';
export const DEFAULT_DADATA_CLEAN_ADDRESS_REQUEST_LINK = 'https://dadata.ru/api/v2/clean/address';

export const getDefaultDadataRequestLink = (serviceName: string, subjectName: string) => {
    return `https://suggestions.dadata.ru:443/suggestions/api/4_1/rs/${subjectName}/${serviceName}`;
};

export const getDefaultDadataRequestConfig = (token: string, secret?: string) => {
    return {
        //port: 443,
        headers: getDefaultDadataHeaders(token, secret),
    };
};

const getDefaultDadataHeaders = (token: string, secret?: string) => {
    if (secret) {
        return {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'X-Secret': secret,
        };
    }
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
        'X-Secret': '',
    };
};

interface ISearchResult {
    onSuccess: (result: IAddressDadataType[]) => void;
    onError?: (result: any) => void;
}

export const getAddressSearchDadata = (value: string, config: ISearchResult) => {
    const { onSuccess, onError } = config;
    const params = {
        query: value,
        count: 10,
    };
    axios
        .post(getDefaultDadataRequestLink('address', 'suggest'), params, getDefaultDadataRequestConfig(dadata_api_key))
        .then((result: IResponseType) => onSuccess(result?.data?.suggestions))
        .catch((error) => onError && onError(error));
};

export const getGeolocateSearchDadata = (lat: number, lon: number, config: ISearchResult) => {
    const { onSuccess, onError } = config;
    const params = {
        lat,
        lon,
    };
    axios
        .post(getDefaultDadataRequestLink('address', 'geolocate'), params, getDefaultDadataRequestConfig(dadata_api_key))
        .then((result: IResponseType) => onSuccess(result?.data?.suggestions))
        .catch((error) => onError && onError(error));
};
