/**
 * Created by uxin on 2017/8/27.
 */
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './../reducers';

let middlewares = [
    thunk,
];
if(process.env.NODE_ENV == 'development'){
    const logger = createLogger();
    middlewares.push(logger);
}
let createAppStore = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    const store = createAppStore(reducers);
    return store;
}