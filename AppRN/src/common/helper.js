import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Text
} from 'react-native';




Array.prototype.remove = function (fn) {
    let result = [];
    this.forEach((item, index) => {
        if (!fn(item)) {
            result.push(item);
        }
    });
    return result;
};
import net from './NW';
import config from '../config';

export default {
    getTips() {
        var date = new Date();
        var h = date.getHours();
        if (h < 19) {
            return (
                <View style={styles.message} key="asdasdasdas">
                    <Text style={styles.messageText}>
                        今日19点更新数据（以下为昨日数据）
                    </Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.message}>
                    <Text style={styles.messageText}>
                        今日数据已更新（截止到19点）
                    </Text>
                </View>
            );
        }
    },
    random() {
        return parseInt(Math.random() * 100000000);
    },
    initSeason() {
        net.post("/home/getseason", {}, function (data) {
            global.MONTHTAG = data.Data;
        });
    },
    getConifgItem: function (key) {
        if (config.isDev) {
            return config.dev[key];
        }
        return config.production[key];
    },
    getSeasonTag(actIndex) {
        var $ = this;
        var tags = [];
        global.MONTHTAG && global.MONTHTAG.forEach((item, index) => {
            var css = {};
            if (index == (actIndex || 0)) {
                css.backgroundColor = "#004cd1";
            }
            tags.push(
                <TouchableOpacity onPress={() => {

                } } key={$.random()} style={[styles.tagCol, css]}>
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                        {item.Name}
                    </Text>
                </TouchableOpacity>
            );
        });
        return (
            <View style={styles.tagRow}>
                {tags}
            </View>
        );
    },
    onePix: 1 / PixelRatio.get()
};


const styles = StyleSheet.create({
    message: {
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 3,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    messageText: {
        fontSize: 12,
        color: "#23a5e2"
    },
    tagRow: {
        flexDirection: "row"
    },
    tagCol: {
        marginRight: 10,
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "#004cd1",
        borderRadius: 3,
    },
    tagAct: {

    }
});