import {
    Alert,
    DeviceEventEmitter,
    NativeModules
} from 'react-native'
import config from '../config'
import DeviceInfo from "react-native-device-info";
import Toast from "react-native-simple-toast";
var NativeCommonTools = NativeModules.CommonTools;

export default {
    post(url, data, success, error, dataType) {
        ajax({ url: url, data: data, success: success, error: error, dataType: dataType, type: 'POST' });
    },
    get(url, data, success, error, dataType) {
        ajax({ url: url, data: data, success: success, error: error, dataType: dataType, type: 'GET' })
    }
}

function go(fech) {
    let self = this;
    let abortFn = null;
    let abortPromise = new Promise((resolve, reject) => {
        abortFn = () => {
            reject("timeout");
        }
    });
    let abortabeProise = Promise.race([fech, abortPromise]);
    abortabeProise.abort = abortFn;
    return abortabeProise;
}

function objToQuery(obj) {
    if (obj) {
        var result = ''
        for (var d in obj) {
            if (obj[d] instanceof Function)
                continue
            result += d + '=' + obj[d] + '&'
        }
        return result.substring(0, result.length - 1)
    }
    return ''
}

function ajax(params) {

    var url = ''
    var dataType = params.dataType && params.dataType.toLowerCase() === 'json'
    var body = null
    var timeOut = params.timeout || 10000;
    var paramsUrl = params.url.indexOf('/') == 0 ? params.url.substring(1) : params.url
    if (config.isDev) {
        url = config.dev.server.concat(paramsUrl)
    } else {
        url = config.production.server.concat(paramsUrl)
    }
    var headers = new Headers();
    headers.append("Cache-control", "no-cache");
    if (!dataType) {
        headers.append('Content-Type', 'application/x-www-form-urlencoded')
    } else {
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
    }

    var requestParams = {
        method: params.type,
        headers: headers
    }


    if (!params.data) {
        params.data = {};
    }

    params.data.PhoneType = DeviceInfo.getModel();
     params.data.UniqueCode = __TYPE__ == "ios" ? DeviceInfo.getUniqueID() : NativeCommonTools.imei;
    params.data.OS = DeviceInfo.getSystemName();
    params.data.OSVersion = DeviceInfo.getSystemVersion();
    if (global.token) {
        console.log(`用户token:${global.token}`);
        params.data.token = global.token;
    }

    if (params.type.toLowerCase() === 'post') {
        //body = dataType ? JSON.stringify(params.data) : objToQuery(params.data);
        if (dataType) {
            body = JSON.stringify(params.data);
        } else {
            body = objToQuery(params.data);
        }
        requestParams.body = body;
        console.log("【POST请求】URL: " + url + " 请求主体: " + body);
    }

    if (params.type.toLowerCase() === "get") {
        url += "?" + objToQuery(params.data);
        console.log("【EGT请求】:" + url);
    }
    var fetchRes = go(fetch(url, requestParams));

    fetchRes.then(response =>
        response.json()
    ).then(json => {
        if (json.Status == -2) {
            DeviceEventEmitter.emit("noLogin");
        } else {
            params.success && params.success(json);
        }
    }).catch(err => {
        params.error && params.error(err);
        Toast.showWithGravity("通讯被外星人阻断了", Toast.LONG, Toast.BOTTOM);
    }).done();

    setTimeout(() => {
        fetchRes.abort();
    }, timeOut);
}

