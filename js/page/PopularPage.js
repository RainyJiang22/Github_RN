/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *最新界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil';


type Props = {};
export default class PopularPage extends Component<Props> {

  //顶部导航动态显示
  constructor(props){
    super(props);
    this.tabNames =['Java','Android','iOS','React','React Native','PHP'];
  }
  _genTabs(){
    const tabs={};
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLabel={item}/>,  //传递数据
        navigationOptions:{
          title:item
        }
      }
    });
    return tabs;
  }


  //react-navigation3.x的特性
  _tabTopNavigator(){
    const TabNavigator = createMaterialTopTabNavigator(
        this._genTabs(),{
          tabBarOptions:{
            tabStyle:styles.tableStyle,
            upperCaseLabel:false, //是否使用标签大写
            scrollEnabled:true, //是否支持选项卡可以滚动
            style:{
              backgroundColor:"#678" //配置tab的背景色
            },
            indicatorStyle:styles.indicatorStyle, //指示器的颜色
            labelStyle:styles.labelStyle, //文字的样式

          }
        }
    );
    return  createAppContainer(TabNavigator);
  }



  render() {
    const TabNavigator = this._tabTopNavigator();
    return <TabNavigator/>
  }
}

class PopularTab extends Component<Props> {
  render() {

    const {tabLabel} = this.props;
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>{tabLabel}</Text>
          <Text onPress={() =>{
             NavigationUtil.goPage({
                navigation:this.props.navigation
             },"DetailPage")
          }}>跳转到详情页</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tableStyle:{
      minWidth: 50
  },
  indicatorStyle:{
    height:2,
    backgroundColor: '#F5FCFF',
  },
  labelStyle:{
     fontSize:13,
    marginTop:6,
    marginBottom: 6,
  }
});
