import {
    TabNavigator,
    StackNavigator,
    addNavigationHelpers
} from "react-navigation";

import Home from '../components/Home';
import Counter from './../components/Counter';
import Counter2 from './../components/Counter2';
// import Category from '../components/Category';
// import Card from '../components/Card';
// import UserCenter from '../components/UserCenter';
// import NewsDetail from '../components/NewsDetail';

// const TabbarNavigator = TabNavigator({
//     Home: { screen: Home },
//     Category: { screen: Category },
//     Card: { screen: Card },
//     UserCenter: { screen: UserCenter }
// }, {
//     initialRouteName: 'Home'
// });

const AppNavigator = StackNavigator({
    Home: {
        screen: Counter,
        // navigationOptions: {
        //     header: null
        // }
    },
    SecondPage:{
        screen:Counter2,
    }
});

export {
    AppNavigator
};
