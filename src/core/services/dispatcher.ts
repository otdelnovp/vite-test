import axios from 'axios';
import moment from 'moment';
import { Action } from 'redux';

import { alertActions } from '@services/alertService';

import { Configuration } from '../config';
import { AppThunk } from '@services/index';
import { getHash, getGuid } from '@helpers/methods';

/**
 * интерфейс для перечисления всех action creator'ов в формате ключ: значение
 */
interface IStringMap<T> {
    [key: string]: T;
}

export type IAnyFunction = (...args: any[]) => any;

/** A - generic, который является расширением IStringMap
 * @type IStringMap может содержать любую функцию (IAnyFunction)
 * на выходе ожидаем тип, равный типу данных, который вернет функция
 * т.е. по факту как объект с ключами и значениями
 */
export type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

/**
 * дефолтный интерфейс тела запроса
 */
export interface IAsyncRequestType {
    from?: string;
    type: string;
    body: any;
    template?: string;
    metric?: string;
    successText?: string;
}

export interface IServerError {
    code: number;
    msg: string;
}

interface IServerResponse {
    dt: string;
    error?: IServerError;
    body: any;
    ref: string;
    sign: string;
    time: string;
}

/**
 * дефолтный пост-запрос
 * @param params
 * @param url
 */
export const createRequest = (params: IAsyncRequestType, url = Configuration.API_URL): Promise<Action> => {
    return axios.post(url, createEnvelope(params));
};

const generateSign = (body: string, userKey: string, mn: string, dt: string) => {
    const matchedSymbols = body ? body.match(/[0-9A-Za-zА-Яа-я]/g) : null;
    const bodyData = matchedSymbols ? getHash(matchedSymbols.join('')) : '';
    const signString = bodyData + userKey + mn + dt;
    return getHash(signString);
};

/**
 *
 * @param from - от кого сообщение
 * @param type - тип сообщения
 * @param body - тело запроса
 * @param template - шаблон
 * @param metric - метрика
 */
export function createEnvelope({ from, type, body, template, metric }: IAsyncRequestType) {
    const dt = moment(new Date()).toString();
    const mn = getGuid();
    const env = {
        dt,
        from: from ? from : Configuration.FROM,
        mn,
        type: type,
        body: body,
        template,
        sign: generateSign(JSON.stringify(body), Configuration.SIGN, mn, dt),
        metric,
    };
    console.log('envelope - ', JSON.stringify(env));
    return env;
}

export interface IAsyncOptions {
    onSuccess?: (response: any) => void;
    onError?: (response: any) => void;
    //ignoreError?: boolean;
    successText?: string;
    params?: {
        [any: string]: any;
    };
}

const emptyAsyncOptions: IAsyncOptions = {
    successText: '',
    params: {},
};

export const asyncRequestAction = (
    params: IAsyncRequestType,
    actionTypes: any,
    options = emptyAsyncOptions,
): AppThunk => async (dispatch: any) => {
    try {
        dispatch(actionTypes.request(options.params));
        const fetchData = await createRequest(params);
        // @ts-ignore
        const { error, body } = fetchData.data as IServerResponse;
        const { onSuccess, successText, onError } = options;
        if (error) {
            if (error.code < 1000) {
                dispatch(alertActions.alertError({ message: error.msg }));
            }
            if (onError && typeof onError === 'function') {
                onError(body);
            }
            dispatch(actionTypes.failure(error));
        } else {
            dispatch(actionTypes.success({ result: body }));
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(body);
            }
            if (successText && successText.length > 0) {
                dispatch(alertActions.alertSuccess({ message: successText }));
            }
        }
    } catch (err) {
        dispatch(actionTypes.failure({ message: err }));
    }
};

// Запрос к сервису Open Street Map
// http://router.project-osrm.org/table/v1/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?annotations=duration,distance

export const createRequestOSM = (params: IAsyncRequestType, url = Configuration.OSM_API): Promise<Action> => {
    const { type, body } = params;
    const locations = body.locations.map((location: number[]) => location.join(',')).join(';');
    const requestUrl = `${url}${type}/v1/${body.profile}/${locations}?annotations=${body.annotations}`;
    console.log('envelope OSM - ' + requestUrl);
    return axios.post(
        requestUrl,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};

export const asyncRequestActionOSM = (
    params: IAsyncRequestType,
    actionTypes: any,
    options = emptyAsyncOptions,
): AppThunk => async (dispatch: any) => {
    try {
        dispatch(actionTypes.request(options.params));
        const fetchData = await createRequestOSM(params);
        // @ts-ignore
        const { data, message } = fetchData as IServerResponse;
        const { onSuccess, successText, onError } = options;
        if (message) {
            dispatch(alertActions.alertError({ message: message }));
            if (onError && typeof onError === 'function') {
                onError(message);
            }
            dispatch(actionTypes.failure(message));
        } else {
            dispatch(actionTypes.success({ result: data }));
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(data);
            }
            if (successText?.length) {
                dispatch(alertActions.alertSuccess({ message: successText }));
            }
        }
    } catch (err) {
        dispatch(actionTypes.failure({ message: err }));
    }
};
