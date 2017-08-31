/**
 * Created by uxin on 2017/8/29.
 */
import { connect } from 'react-redux';
import { addNavigationHelpers,StackNavigator } from 'react-navigation';

import Counter from './../components/Counter';
import Counter2 from './../components/Counter2';

export const AppNavigator = StackNavigator({
    Login:{ screen:Counter },
    SecondPage:{ screen:Counter2 },
});


function mapStateToProps(state) {
    // nav:state.
}