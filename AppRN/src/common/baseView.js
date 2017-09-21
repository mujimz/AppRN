import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image,
    DeviceEventEmitter
} from 'react-native';
import { NavigationActions } from 'react-navigation';
export default class BaseView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        this.codepushEvent = DeviceEventEmitter.addListener('goCodepushEvent', this.resetCodepushView.bind(this));
    }
    componentWillUnmount() {
        this.codepushEvent.remove();
    }
    resetCodepushView() {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'CodePushView' })]
        }));
    }
    render() {
        return (
            <View {...this.props} style={[{ flex: 1, backgroundColor: "#e6e6e6" }, this.props.style]} >
                <View style={[{ flex: 1 }, this.props.contentStyle]}>
                    {this.renderChildren()}
                </View>

            </View>

        );
    };

    renderChildren() {
        var childEelments = [];
        React.Children.forEach(this.props.children, item => {
            childEelments.push(item);
        });
        return (childEelments);
    }
} 