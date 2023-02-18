import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from '@services/index';
import App from './App';

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.onSuccess', 'payload.onError'],
        },
    }).concat([createLogger({ duration: true })]),
});
export type AppDispatch = typeof store.dispatch;
const root = createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </CookiesProvider>
    </Provider>,

    // document.getElementById('root'),
);

serviceWorker.unregister();

