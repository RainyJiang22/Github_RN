/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *自定义界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView,Text, View,Alert} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import NavigationBar from "../common/NavigationBar";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import BackPressComponent from "../common/BackPressComponent";
import LanguageDao from "../expand/dao/LanguageDao";
import ViewUtil from "../util/ViewUtil";
import CheckBox from 'react-native-check-box'
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtil from "../navigator/NavigationUtil";
import ArrayUtil from "../util/ArrayUtil";
//const TITLE_COLOR = '#2a8ffa';
type Props = {};
class CustomKeyPage extends Component<Props> {

  //顶部导航动态显示
  constructor(props){
    super(props);
    console.disableYellowBox = true; //取消Warning界面
      this.params = this.props.navigation.state.params;
      this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
      this.changeValues = [];
      //标签移除
      this.isRemoveKey = !!this.params.isRemoveKey;
      this.lanuageDao = new LanguageDao(this.params.flag);
      this.state = {
          keys: []
      }
  }

    static getDerivedStateFromProps(nextProps, prevState) {
         if (prevState.keys !== CustomKeyPage._keys(nextProps,null,prevState)){
             return{
                 keys:CustomKeyPage._keys(nextProps,null,prevState),
             }
         }
         return null;
    }


    /**
     * 获取标签
     * @param props
     * @param original 移除标签时使用，是否从props获取原始对的标签
     * @param state 移除标签时使用
     * @returns {*}
     * @private
     */
  static _keys(props,original,state){
     const {flag,isRemoveKey} = props.navigation.state.params;
        let key = flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages";
      //标签移除以后考虑
        if (isRemoveKey && !original) {
            //如果state中的keys为空则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {//注意：不直接修改props，copy一份
                    ...val,
                    checked: false
                };
            });
        } else{
            return props.language[key];
        }
    }


    onBackPress(e) {
        this.onBack();
        return true;
    }

    componentDidMount(){
        this.backPress.componentDidMount();
        //如果props中标签为空则从本地存储中获取标签
        if (CustomKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
        this.setState({
            keys:CustomKeyPage._keys(this.props),

        })

    }

    componentWillUnmount(){
          this.backPress.componentWillUnmount();
    }


    /**
     * 保存此次数据的变更
     */
      onSave(){
          if (this.changeValues.length === 0){
              NavigationUtil.goBack(this.props.navigation);
              return;
          }
          let keys;
        if (this.isRemoveKey) {//移除标签的特殊处理
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtil.remove(keys = CustomKeyPage._keys(this.props, true), this.changeValues[i], "name");
            }
        }
          //更新数据
        this.lanuageDao.save(keys || this.state.keys);
        const {onLoadLanguage} = this.props;
        //更新store
        onLoadLanguage(this.params.flag);
        //返回上一页
        NavigationUtil.goBack(this.props.navigation);
      }


      renderView(){
          let dataArray =  this.state.keys;
          if (!dataArray || dataArray.length === 0)
              return;
          let len = dataArray.length;
          let views = [];
          for(let i = 0,l = len;i<l;i+=2){
              views.push(
                  <View key={i}>
                      <View style={styles.item}>
                          {this.renderCheckBox(dataArray[i],i)}
                          {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                      </View>
                      <View style={styles.line}/>
                  </View>
              )
          }
          return views;
      }



      //点击改变item状态
    onClick(data, index) {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues, data);
        this.state.keys[index] = data;//更新state以便显示选中状态
        this.setState({
            keys: this.state.keys
        })
    }

    /**
     * 返回
     * 同时需要判断是否修改相关状态
     */
    onBack(){
        if (this.changeValues.length > 0){
              Alert.alert('提示','要保存修改吗?',
                  [
                      {
                          text: '否', onPress: ()=>{
                              NavigationUtil.goBack(this.props.navigation);
                          }
                      },{
                       text: '是', onPress: () =>{
                           this.onSave();
                      }
                    }
                  ])
        }else{
            NavigationUtil.goBack(this.props.navigation);
        }
      }


      //显示复选框图片
    _checkedImage(checked) {
        const {theme} = this.params;
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: theme.themeColor,
            }}/>
    }

      //复选框
      renderCheckBox(data,index){
          return <CheckBox
              style={{flex:1,padding: 10}}
              onClick={() => this.onClick(data,index)}
              isChecked={data.checked}
              leftText={data.name}
              checkedImage={this._checkedImage(true)}
              unCheckedImage={this._checkedImage(false)}
          />
      }

  render() {
        const {theme} = this.params;
     let title = this.isRemoveKey ? '标签移除' : '自定义标签';
      title = this.params.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
      let rightButtonTitle  =  this.isRemoveKey ? '移除': '保存';
      let navigationBar = <NavigationBar
        title={title}
        style={theme.styles.navBar}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        rightButton={ViewUtil.getRightButton(rightButtonTitle,()=>this.onSave())}
      />;

      return <View style={styles.container}>
          {navigationBar}
          <ScrollView>
              {this.renderView()}
          </ScrollView>
      </View>
  }
}

//订阅，获取key值
const mapPopularStateToProps = state => ({
    language: state.language,
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(CustomKeyPage);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    item:{
         flexDirection: 'row',
    },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tableStyle:{
    //  minWidth: 50
      padding : 0
  },
  indicatorStyle:{
    height:2,
    backgroundColor: '#F5FCFF',
  },
  labelStyle:{
     fontSize:13,
     margin:0,
  },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    line: {
        flex:1,
        height:0.3,
        backgroundColor: 'darkgray',
    }
});
