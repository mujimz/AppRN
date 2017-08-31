/**
 * Created by uxin on 2017/8/29.
 */
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";

import { AppNavigator } from './../routers';

class Nav extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}
const mapStateToProps = (state) => ({
    nav: state.nav
});
export default connect(mapStateToProps)(Nav);