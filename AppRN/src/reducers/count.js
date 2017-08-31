/**
 * Created by uxin on 2017/8/26.
 */
import * as types from './../actions/types';

const initialState = {
    value:1,
};
export default (state=initialState,action) => {
    switch (action.type){
        case types.INCREMENT:
            return {
                ...state,
                value:action.count,
            };
        case types.DECREMENT:
            return {
                ...state,
                value:action.count,
            };
        default:
            return state;
    }
}