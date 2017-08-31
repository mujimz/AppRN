import { combineReducers } from 'redux';

import count from './count';
import navReducer from './navReducer';

export default combineReducers({
    nav:navReducer,
    count,
})