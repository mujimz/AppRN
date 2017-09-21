import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
let { height, width } = Dimensions.get('window')
export default class CodePushModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: this.props.isShow || true,
            modalVisible:this.props.modalVisible || true,
            transparent:true,
            progressResive:0,
            progressTotal:0,
            progressPre:'0%',
            title:'正在更新'
        }
    }
    componentDidMount() {
         this.openModalEvent=DeviceEventEmitter.addListener('openCodepushModal',()=>{
             this._setModalVisible(true);
         });
         this.progressEvent=DeviceEventEmitter.addListener('progressEvent',(progress)=>{
             let pre=((progress.receivedBytes/progress.totalBytes)*100)+'%';
             let total=(progress.totalBytes/1024/1024).toFixed(2);
             let curResive=(progress.receivedBytes/1024/1024).toFixed(2);
             this.setState({
                 progressPre:pre,
                 progressResive:curResive,
                 progressTotal:total
             })
         })
    }
    componentWillUnmount(){
        this.openModalEvent.remove();
        this.progressEvent.remove();
    }
    _setModalVisible(visible) {
        this.setState({
             modalVisible: visible,
             isShow:visible
             });
    }
    _setModalTitle(title){
        this.setState({
            title:title
        });
    }
    render() {
        return (
            <View style={[{ width: width, height: height,backgroundColor:'#e6e6e6' }, this.state.isShow ? {} : { height: 0, width: 0 }]}>
                <Modal
                    animationType="slide"
                    visible={this.state.modalVisible}
                    transparent={this.state.transparent}
                    onRequestClose={() => {}}
                >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:'80%',height:180,backgroundColor:'#fff',padding:20}}>
                        <Text style={{textAlign:"center"}}>{this.state.title}</Text>
                        <View style={{height:10,borderColor:'#00a8ff',borderWidth:StyleSheet.hairlineWidth,marginTop:40,borderRadius:10,overflow:'hidden'}}>
                            <View style={{height:'100%',width:this.state.progressPre,backgroundColor:'#00a8ff',borderRadius:10}}></View>
                        </View>
                        <Text style={{textAlign:'right',marginTop:40}}>{this.state.progressResive}/{this.state.progressTotal}M</Text>
                    </View>
                </View>
                </Modal>
            </View>
        )
    }
}