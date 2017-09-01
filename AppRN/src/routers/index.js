import {
    TabNavigator,
    StackNavigator,
    addNavigationHelpers
} from "react-navigation";

import Counter from './../components/Counter';
import Counter2 from './../components/Counter2';

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
