import React from 'react';
import { compose } from 'redux';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { RootState } from '@services/index';
import { alertActions } from '@services/alertService';

import { ALERT_LIFETIME } from '@helpers/alertHelper';

const Alerts = ({ messages }: AlertsReduxProps) => {
    const dispatch = useDispatch();
    return (
        <div>
            {messages.map((item: any) => {
                const clearMsg = () => {
                    dispatch(alertActions.alertClear({ message: '', alertId: item.id }));
                };
                return (
                    <Snackbar
                        key={item.id}
                        id={item.id}
                        open={true}
                        onClose={clearMsg}
                        autoHideDuration={ALERT_LIFETIME * 1000}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={clearMsg} variant="filled" severity={item.type}>
                            {item.header && <AlertTitle>{item.header}</AlertTitle>}
                            {item.text}
                        </Alert>
                    </Snackbar>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        messages: state.alert.messageList,
    };
};

const connector = connect(mapStateToProps);
type AlertsReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Alerts);
