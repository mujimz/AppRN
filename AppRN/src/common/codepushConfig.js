import CodePush from 'react-native-code-push';
import { DeviceEventEmitter } from 'react-native';
import helper from './helper';
import net from './net';

let defaultConfig = {
    installMode: CodePush.InstallMode.IMMEDIATE,
    updateDialog: {
        mandatoryContinueButtonLabel: '立即更新',
        mandatoryUpdateMessage: '有新版本了，请您及时更新',
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '立即更新',
        optionalUpdateMessage: '有新版本了，请您及时更新',
        title: '更新提示'
    }
};


let codepushSync = function () {
    let curObj = JSON.parse(JSON.stringify(defaultConfig));
    try {
        net.get(helper.getConifgItem('codepushUrl'), { v: helper.random() }).then(data => {
            let cpItem = null;
            if (data.code == 1) {
                cpItem = global.__Platform__ == "ios" ? data["ios"] : data["android"];
                 if (!cpItem.isShowDialog) {
                     curObj.updateDialog = false;
                     curObj.installMode = CodePush.InstallMode.ON_NEXT_RESTART;
                 } else {
                     curObj.updateDialog = cpItem.updateDialog;
                     curObj.installMode = CodePush.InstallMode.IMMEDIATE;
                 }
                 if(cpItem.isUpdate){
                    execSync(curObj);
                 }    
            }
        })
    } catch (e) {
        execSync(defaultConfig);
    }
}
function execSync(obj) {
    CodePush.sync(obj, (status) => {
        switch (status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log('CHECKING_FOR_UPDATE', CodePush.SyncStatus.CHECKING_FOR_UPDATE);
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                if (obj.updateDialog) {
                    DeviceEventEmitter.emit("goCodepushEvent");
                }
                console.log('DOWNLOADING_PACKAGE', CodePush.SyncStatus.DOWNLOADING_PACKAGE);
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                console.log('AWAITING_USER_ACTION', CodePush.SyncStatus.AWAITING_USER_ACTION);
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log('INSTALLING_UPDATE', CodePush.SyncStatus.INSTALLING_UPDATE);
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log('UP_TO_DATE', CodePush.SyncStatus.UP_TO_DATE);
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log('UPDATE_IGNORED', CodePush.SyncStatus.UPDATE_IGNORED);
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log('UPDATE_INSTALLED', CodePush.SyncStatus.UPDATE_INSTALLED);
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                console.log('UNKNOWN_ERROR', CodePush.SyncStatus.UNKNOWN_ERROR);
                break;
            default:
                break;
        }
    },
        (progress) => {
            if (obj.updateDialog) {
                DeviceEventEmitter.emit("progressEvent", progress);
            }
        }
    );
}

// CodePush.getCurrentPackage().then((LocalPackage)=>{
//     console.log('LocalPackage',LocalPackage);
//  })
export default {
    codepushSync
}