/**
 * Created by uxin on 2017/8/29.
 */
import {AppNavigator} from './../routers';

import * as types from './../actions/types';

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducer;
