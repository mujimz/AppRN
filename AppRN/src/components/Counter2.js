/**
 * Created by uxin on 2017/8/26.
 */
import React,{Component} from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './../actions/operationCount';

class Counter extends Component{
    static navigationOptions = {
        title: 'Home3',
    }
    constructor(props){
        super(props);
    }
    incrementIfOdd() {
        if(this.props.value % 2 !== 0){
            this.onIncrement();
        }
    }
    incrementAsync() {
        setTimeout(this.onIncrement.bind(this), 1000)
    }
    onIncrement(){
        // this.props.dispatch(addCount());
        this.props.actions.addCount();
    }
    onDecrement() {
        this.props.actions.decCount();
    }
    render(){
        const {value} = this.props;
        return(
            <View>
                <Text>Clicked:{value} times</Text>
                <Button
                    title="+"
                    onPress={this.onIncrement.bind(this)}
                />
                <Button
                    title="-"
                    onPress={this.onDecrement.bind(this)}
                />
            </View>
        );
    }
}

function mapStateToProps(store) {
    return {
        value:store.count.value,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actions,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);