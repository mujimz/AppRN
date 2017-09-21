/**
 * Created by uxin on 2017/8/26.
 */
import React,{Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Nav from './components/Nav';
import codePush from 'react-native-code-push';
import CodePushConfig from './common/codepushConfig';
import CodePushApp from './common/codepushApp';
// try {
//     CodePushConfig.codepushSync();
// } catch (e) {

// }

let store = configureStore();
// android
// code-push release-react apprn-android android  --t 1.0.0 --dev false --d Production --des "1.优化操作流程" --m true
// code-push release-react apprn-android android  --t 1.0.0 --dev false --d Staging --des "1.优化操作流程" --m true
// ios
// code-push release-react apprn-ios ios  --t 1.0.0 --dev false --d Production --des "1.优化操作流程" --m true
// code-push release-react apprn-ios ios  --t 1.0.0 --dev false --d Staging --des "1.优化操作流程" --m true

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
                {/* <Nav/> */}
                <CodePushApp/>
            </Provider>
        );
    }
}
