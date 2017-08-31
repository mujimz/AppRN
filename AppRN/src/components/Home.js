import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Button,
    Alert
} from 'react-native';

class Home extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
    };
    render() {
        return (
            <View>
                <Button title="afaaffadfd" onPress={Alert.alert('123')}/>
            </View>
        );
    }
}

export default Home;
