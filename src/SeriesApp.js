import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Router from './Router';
import rootReducer from './reducers';

const store = createStore(rootReducer);

const SeriesApp = prop => (
    <Provider store={ store }>
        <Router />
    </Provider>
);

export default SeriesApp;