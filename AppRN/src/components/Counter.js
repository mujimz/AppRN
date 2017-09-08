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
import VersionUpdate from './Version/version'


import * as actions from './../actions/operationCount';


class Counter extends Component{
    static navigationOptions = {
        title: 'Home',
    }
    constructor(props){
        super(props);
    }
    incrementIfOdd() {
        this.props.actions.toSecondPage();
        // if(this.props.value % 2 !== 0){
        //     this.onIncrement();
        // }
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
            <View style={style.container}>

                <Button
                    title="+"
                    onPress={this.onIncrement.bind(this)}
                />
                <Button
                    title="003"
                    onPress={this.onDecrement.bind(this)}
                />
                <Text>Clicked:{value} times</Text>
                <Button
                    title="Increment if odd"
                    onPress={this.incrementIfOdd.bind(this)}
                />
                <Button
                    title="Increment async"
                    onPress={this.incrementAsync.bind(this)}
                />
                <VersionUpdate />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        value:state.count.value,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(actions,dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ffffff',
    }
});