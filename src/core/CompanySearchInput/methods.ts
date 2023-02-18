import axios from 'axios';

export interface ICompanyDadataType {
    value: string;
    unrestricted_value: string;
    data?: {
        kpp: string;
        opf: {
            short: string;
        },
        name: {
            full_with_opf: string;
            short_with_opf: string;
        },
        inn: string;
        ogrn: string;
        address: {
            value: string;
            unrestricted_value: string;
        },
        // phones: string;
        // emails: string;
    };
}

export interface ICompanyType {
    Name: string | null;
    LegalAddress: string | null;
    LegalName: string | null;
    INN: string | null;
    KPP: string | null;
    OGRN: string | null;
    OwnershipTypeCode: string | null;
}

export const emptyCompanyData: ICompanyType = {
    Name: null,
    LegalAddress: null,
    LegalName: null,
    INN: null,
    KPP: null,
    OGRN: null,
    OwnershipTypeCode: null,
};

export const prepareCompanyData = (dataDadata: ICompanyDadataType | null) => {
    const newCompanyData = { ...emptyCompanyData }
    if (dataDadata?.data) {
        newCompanyData.Name = dataDadata?.data.name ? dataDadata?.data.name.short_with_opf : ""
        newCompanyData.LegalName = dataDadata?.data.name ? dataDadata?.data.name.full_with_opf : ""
        newCompanyData.LegalAddress = dataDadata?.data.address ? dataDadata?.data.address.value : ""
        newCompanyData.INN = dataDadata?.data.inn
        newCompanyData.KPP = dataDadata?.data.kpp
        newCompanyData.OGRN = dataDadata?.data.ogrn
        newCompanyData.OwnershipTypeCode = dataDadata?.data.opf.short
    }

    return newCompanyData;
}

interface IResponseType {
    data: {
        suggestions: ICompanyDadataType[];
    };
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
    onSuccess: (result: ICompanyDadataType[]) => void;
    onError?: (result: any) => void;
}

export const getCompanySearchDadata = (value: string, config: ISearchResult, inputType: string) => {
    const { onSuccess, onError } = config;
    const params = {
        query: value,
        count: 10,
    };
    axios
        .post(getDefaultDadataRequestLink('party', 'suggest'), params, getDefaultDadataRequestConfig(dadata_api_key))
        .then((result: IResponseType) => {
            if (inputType === "inn") {
                const newSuggestions: ICompanyDadataType[] = result?.data?.suggestions.map((suggestion) => {
                    return { ...suggestion, value: suggestion && suggestion.data ? suggestion?.data?.inn : "" }
                })
                onSuccess(newSuggestions)
            } else {
                onSuccess(result?.data?.suggestions)
            }
        })
        .catch((error) => onError && onError(error));
};