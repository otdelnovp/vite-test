import moment from 'moment';

import { AlertServiceEvents } from '@services/alertService';

import { getGuid } from '@helpers/methods';

export const ALERT_LIFETIME = 5; // 5 sec

export interface IAlertObj {
    id: string;
    type: string;
    text: string;
    header?: string;
    closeDate: string;
}

export interface IAlertAction {
    type: AlertServiceEvents;
    payload: IAlertMessage;
}

export interface IAlertMessage {
    message: string;
    header?: string;
    alertId?: string;
}

export const addAlertToList = (oldAlerts: Array<IAlertObj>, newAlert: IAlertObj) => {
    const isDuplicate = oldAlerts.find((item) => JSON.stringify(item) === JSON.stringify(newAlert));
    if (isDuplicate) return oldAlerts;
    return oldAlerts.concat([newAlert]);
};

export const removeAlertFromList = (alertList: Array<IAlertObj>, alertId?: string) => {
    if (alertId) {
        return alertList.filter((item) => item.id !== alertId);
    }
    return alertList;
};

export const createAlertObj = (type: string, action: IAlertAction) => {
    return {
        id: getGuid(),
        type,
        text: action.payload.message,
        header: action.payload.header,
        closeDate: moment().toISOString(),
    };
};

export const makeAlertAction = <T extends AlertServiceEvents, P>(type: T) => (payload: P) => {
    return {
        type,
        payload,
    };
};
