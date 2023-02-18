import {
    addAlertToList,
    createAlertObj,
    removeAlertFromList,
    IAlertAction,
    IAlertObj,
    IAlertMessage,
    makeAlertAction,
} from '@helpers/alertHelper';

export enum AlertServiceEvents {
    ALERT_SUCCESS = '[ALERT]: SUCCESS',
    ALERT_WARNING = '[ALERT]: WARNING',
    ALERT_ERROR = '[ALERT]: ERROR',
    ALERT_CLEAR = '[ALERT]: CLEAR',
    ALERT_CLEAR_ALL = '[ALERT]: CLEAR_ALL',
}

export interface IAlertSlice {
    header: string;
    message: string;
    messageList: Array<IAlertObj>;
}

const initialState: IAlertSlice = {
    header: '',
    message: '',
    messageList: [],
};

const alertSuccess = makeAlertAction<AlertServiceEvents.ALERT_SUCCESS, IAlertMessage>(AlertServiceEvents.ALERT_SUCCESS);
const alertError = makeAlertAction<AlertServiceEvents.ALERT_ERROR, IAlertMessage>(AlertServiceEvents.ALERT_ERROR);
const alertClear = makeAlertAction<AlertServiceEvents.ALERT_CLEAR, IAlertMessage>(AlertServiceEvents.ALERT_CLEAR);

export const alertActions = {
    alertSuccess,
    alertError,
    alertClear,
};

export const alertReducer = (state: IAlertSlice = initialState, action: IAlertAction): IAlertSlice => {
    switch (action.type) {
        case AlertServiceEvents.ALERT_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                messageList: addAlertToList(state.messageList, createAlertObj('success', action)),
            };
        case AlertServiceEvents.ALERT_ERROR:
            return {
                ...state,
                message: action.payload.message,
                messageList: addAlertToList(state.messageList, createAlertObj('error', action)),
            };

        case AlertServiceEvents.ALERT_WARNING:
            return {
                ...state,
                message: action.payload.message,
                messageList: addAlertToList(state.messageList, createAlertObj('warning', action)),
            };

        case AlertServiceEvents.ALERT_CLEAR:
            return {
                ...state,
                messageList: removeAlertFromList(state.messageList, action.payload.alertId),
            };

        case AlertServiceEvents.ALERT_CLEAR_ALL:
            return initialState;

        default:
            return state;
    }
};

export default alertReducer;
