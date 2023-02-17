import React from 'react';
// import moment from 'moment';
import crypto from 'crypto';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

export const IsTablet = () => useMediaQuery(useTheme().breakpoints.down('md'));
export const IsMobile = () => useMediaQuery(useTheme().breakpoints.down('sm'));

export const getMarkerPoint = (markerData: [number, number]) => {
    if (markerData && markerData.length === 2 && markerData[0] !== 0 && markerData[1] !== 0) {
        return markerData;
    }
    return undefined;
};

export const getHash = (value: string) => crypto.createHash('md5').update(value).digest('hex');

export const guidEmpty = '00000000-0000-0000-0000-000000000000';
export const getGuid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const scrollTop = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current && ref.current.scrollIntoView) {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            //block: 'end', to scroll bottom
        });
    }
};

// export const getDateStr = (startDate?: string) => moment(startDate).format('DD.MM.YYYY');
// export const getYearStr = (startDate?: string) => moment(startDate).format('YYYY');

export function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}

export const declOfNum = (number: number, titles: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

export const CONVERT_NEW_LINE_STR = '<br>';
export const prepareDescriptionForWeb = (description: string) => {
    return description.split(CONVERT_NEW_LINE_STR).join('\n\r');
};

export const phoneMask = (phone: any) => {
    if (!phone) return null;
    phone = phone.toString().replace(/[^0-9]/g, '');
    if (phone.length === 10) phone = '7' + phone;
    const re = /(?:([\d]{1,}?))??(?:([\d]{1,3}?))??(?:([\d]{1,3}?))??(?:([\d]{2}))??([\d]{2})$/;
    return phone.replace(re, (all: any, a: any, b: any, c: any, d: any, e: any) => {
        return (a ? '+' + a + ' ' : '') + (b ? '(' + b + ') ' : '') + (c ? c + '-' : '') + (d ? d + '-' : '') + e;
    });
};

export const phoneToInt = (phone?: any) => {
    if (!phone) return null;
    phone = phone.toString().replace(/[^0-9]/g, '');
    if (phone.length === 11) phone = phone.substr(1, 10);
    phone = parseInt(phone, 10);
    return phone !== 7 ? phone : null;
};

export const openLinkInNewTab = (link: string) => {
    if (typeof window !== 'undefined') {
        const win = window.open(link, '_blank');
        if (win?.focus) win.focus();
    }
};

export const convertStringWithNBSP = (str: string, searchValue = /&nbsp;/g) => {
    return str.replace(searchValue, '\u00a0');
};

export function sortArrayByProp<T extends Object, U extends keyof T>(array: T[] | null = [], prop: U, direction?: string): T[] {
    return array?.length
        ? array.sort((a: any, b: any) => {
              if (a[prop] === null) {
                  return 1;
              }
              if (b[prop] === null) {
                  return -1;
              }
              return b[prop].localeCompare(a[prop][0]) * (direction === 'DESC' ? 1 : -1);
          })
        : [];
}
export function sortArrayByTime<T extends Object, U extends keyof T>(array: T[] | null = [], prop: U, direction?: string): T[] {
    return array?.length
        ? array.sort((a: any, b: any) => {
              const dA = new Date(a[prop]).getTime();
              const dB = new Date(b[prop]).getTime();
              return (dB - dA) * (direction === 'DESC' ? 1 : -1);
          })
        : [];
}

export const getParamByName = (array: any[], value: any, from = 'value', to = 'text') => {
    const foundItem = array.find((item: any) => item[from] === value);
    return foundItem?.[to];
};

export const validateEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string) => !!phone && phone.toString().length >= 10;

export const getDecimalStr = (value: number | null = 0, sign?: string, scale = 2) => {
    const resultPriceStr = (!value ? 0 : +parseFloat(value + '').toFixed(scale)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const resultPriceSign = sign === undefined ? '₽' : sign || '';
    return `${resultPriceStr} ${resultPriceSign}`;
};

export const cubicSmToCubicM = (value: number | null = 0) => {
    return !value ? 0 : value / 1_000_000;
};

export const metresToKilometres = (value: number | null = 0) => {
    return !value ? 0 : value / 1_000;
};

export const getTempStr = (temp: number | null) => (temp && temp > 0 ? `+${temp}℃` : `${temp}℃`);

export const getSquaredStr = (value: number | null = 0, measurement: string, scale: number) =>
    value ? (
        <span>
            {getDecimalStr(value, '', scale)} {measurement}
            <sup>
                <small>{scale}</small>
            </sup>
        </span>
    ) : (
        '–'
    );

export const getPriceStr = (price: number | null = 0, sign?: string) => {
    const resultPriceStr = (!price ? 0 : +parseFloat(price + '').toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const resultPriceSign = !sign ? '₽' : sign;
    return `${resultPriceStr} ${resultPriceSign}`;
};
