import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text,
    NativeModules,
    Animated,
    View
} from 'react-native';
import net from '../../common/net';
import helper from "../../common/helper";
import { baseCss, getPix, onePix, width, height } from "../../common/baseCss";
let versionUpdate = NativeModules.CommonTools;

export default class VersionUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: parseInt(versionUpdate.versionCode),
            isShow: false,
            data: {},
            bottom: new Animated.Value(-height),
        }
        this.isInit = false;
    }

    componentWillMount() {
        let self = this;
        this.getVersion();
        this.timer = setInterval(() => {
            if (self.isInit) {
                clearInterval(self.timer);
            } else {
                self.getVersion();
            }
        }, 20000);
    }

    getVersion() {
        let url = helper.getConifgItem("version");
        let self = this;
        //Toast.showWithGravity(`准备请求网络`, Toast.LONG, Toast.BOTTOM);
        net.get(url, { v: helper.random() }).then(data => {
            self.isInit = true;
            //Toast.showWithGravity(`当前版本号：${self.state.version},服务器版本号：${data.versionCode}`, Toast.LONG, Toast.TOP);
            if (self.state.version < data.versionCode) {
                self.setState({
                    data: data,
                    content: 120,
                    isShow: true
                });
            }
        }).catch(err => {
            //Alert.alert("提示", `更新发生错误:${JSON.stringify(err)}`)
        });
    }

    goUpdate() {
        let data = this.state.data;
        let uri = data.appUrl;
        let tag = helper.getConifgItem("updateTag");
        uri = uri.replace("#path#", `${tag}/${data.dateTime}`);
        versionUpdate.update(uri);
    }

    render() {
        if (!this.state.isShow) return null;
        return (
            <View style={[css.container]}>
                <View style={css.main} >
                    <View style={css.box}>
                        <View style={css.head}>
                            <Text>
                                有新版本啦：{this.state.data.version}
                            </Text>
                        </View>
                        <View style={[css.content]} >
                            <ScrollView>
                                <Text>
                                    {this.state.data.des}
                                </Text>
                            </ScrollView>
                        </View>
                        <View style={css.foot}>
                            <TouchableOpacity activeOpacity={0.6} style={css.btn} onPress={this.goUpdate.bind(this)}>
                                <Text style={css.btnText}>前往更新</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        bottom: 0,
        height: height,
        width: width,
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    head: {
        backgroundColor: "#fff",
        width: width - getPix(80),
        borderBottomWidth: onePix,
        borderColor: "#e5e5e5",
        justifyContent: "center",
        alignItems: "center",
        padding: getPix(30),
        paddingTop: getPix(20),
    },
    box: {
        paddingTop: getPix(10),
        width: width - getPix(80),
        backgroundColor: "#fff",
        borderRadius: getPix(10),
    },
    content: {
        justifyContent: "center",
        width: width - getPix(80),
        padding: getPix(30),
        height: getPix(200)
    },
    timer: {
        paddingLeft: getPix(30)
    },
    timerText: {
        fontSize: 12,
        color: "#999"
    },
    foot: {
        justifyContent: "center",
        alignItems: "center",
        padding: getPix(30)
    },
    btn: {
        width: getPix(200),
        justifyContent: "center",
        alignItems: "center",
        height: getPix(60),
        borderRadius: getPix(6),
        backgroundColor: "#37acf4"
    },
    btnText: {
        fontSize: 13,
        color: "#fff"
    }
});
