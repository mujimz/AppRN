import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CodePush from "react-native-code-push";

export default class CodePushApp extends Component {
    constructor() {
        super();
        this.state = { restartAllowed: true };
    }
    componentWillMount(){
        CodePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
    }

    componentDidMount(){
        CodePush.allowRestart();//在加载完了可以允许重启
    }
    codePushStatusDidChange(syncStatus) {
        switch(syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ syncMessage: "Checking for update." });
            break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ syncMessage: "Downloading package." });
            break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ syncMessage: "Awaiting user action." });
            break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ syncMessage: "Installing update." });
            break;
            case CodePush.SyncStatus.UP_TO_DATE:
            this.setState({ syncMessage: "App up to date.", progress: false });
            break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
            this.setState({ syncMessage: "Update cancelled by user.", progress: false });
            break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
            break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({ syncMessage: "An unknown error occurred.", progress: false });
            break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({ progress });
    }

    toggleAllowRestart() {
        this.state.restartAllowed
            ? CodePush.disallowRestart()
            : CodePush.allowRestart();

        this.setState({ restartAllowed: !this.state.restartAllowed });
    }

    getUpdateMetadata() {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata: LocalPackage) => {
            this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
            }, (error: any) => {
            this.setState({ syncMessage: "Error: " + error, progress: false });
            });
    }

  /** Update is downloaded silently, and applied on restart (recommended) */
    sync() {
        CodePush.sync(
        {},
        this.codePushStatusDidChange.bind(this),
        this.codePushDownloadDidProgress.bind(this)
        );
    }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        CodePush.sync(
        //   { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
            {
                installMode: CodePush.InstallMode.IMMEDIATE, //启动模式三种：ON_NEXT_RESUME、ON_NEXT_RESTART、IMMEDIATE
                updateDialog: {
                    appendReleaseDescription:true,//是否显示更新description，默认为false
            
                    descriptionPrefix:"更新内容：",//更新说明的前缀。 默认是” Description:

                    mandatoryContinueButtonLabel:"立即更新",//强制更新的按钮文字，默认为continue

                    mandatoryUpdateMessage:"",//- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.

                    optionalIgnoreButtonLabel: '稍后',//非强制更新时，取消按钮文字,默认是ignore

                    optionalInstallButtonLabel: '后台更新',//非强制更新时，确认文字. Defaults to “Install”

                    optionalUpdateMessage: '有新版本了，是否更新？',//非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.

                    title: '更新提示'//要显示的更新通知的标题. Defaults to “Update available”.
                } 
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
  }

  render() {
    let progressView;

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to CodePush!
        </Text>
        <TouchableOpacity onPress={this.sync.bind(this)}>
          <Text style={styles.syncButton}>Press for background sync</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
          <Text style={styles.syncButton}>Press for dialog-driven sync</Text>
        </TouchableOpacity>
        {progressView}
        {/* <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require("./images/laptop_phone_howitworks.png")}/> */}
        <TouchableOpacity onPress={this.toggleAllowRestart.bind(this)}>
          <Text style={styles.restartToggleButton}>Restart { this.state.restartAllowed ? "allowed" : "forbidden"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getUpdateMetadata.bind(this)}>
          <Text style={styles.syncButton}>Press for Update Metadata</Text>
        </TouchableOpacity>
        <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 50
  },
  image: {
    margin: 30,
    width: Dimensions.get("window").width - 100,
    height: 365 * (Dimensions.get("window").width - 100) / 651,
  },
  messages: {
    marginTop: 30,
    textAlign: "center",
  },
  restartToggleButton: {
    color: "blue",
    fontSize: 17
  },
  syncButton: {
    color: "green",
    fontSize: 17
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

CodePushApp = CodePush(codePushOptions)(CodePushApp);

// AppRegistry.registerComponent("CodePushDemoApp", () => CodePushDemoApp);
// export default CodePushApp;