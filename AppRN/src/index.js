/**
 * Created by uxin on 2017/8/26.
 */
import React,{Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Nav from './components/Nav';
import codePush from 'react-native-code-push'
let store = configureStore();

export default class Root extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        codePush.sync();
    }
    render(){
        return(
            <Provider store={store}>
                <Nav/>
            </Provider>
        );
    }
}
