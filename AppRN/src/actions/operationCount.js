/**
 * Created by uxin on 2017/8/27.
 */
import {NavigationActions} from 'react-navigation';
import * as types from './types';
import {get,post} from './../tools';

export function addCount() {
    return (dispatch,getState) => {
        // let test = get('http://www.baidu.com');
        let count = getState().count.value+1;
        dispatch({
            type:types.INCREMENT,
            count,
        });
    };
}

export function decCount() {
    return (dispatch,getState) => {
        // let test = get('http://www.baidu.com');
        let count = getState().count.value-1;
        dispatch({
            type:types.DECREMENT,
            count,
        })
    }
}

export function toSecondPage() {
    return (dispatch,getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'SecondPage' }));
    }
}
