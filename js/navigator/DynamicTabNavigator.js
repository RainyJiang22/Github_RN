/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *动态导航栏
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {DeviceInfo} from 'react-native';

import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';

import {createBottomTabNavigator,
  createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';
import {BottomTabBar} from "react-navigation";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";


const TABS = {  //在这里配置路由
  PopularPage:{
    screen: PopularPage,
    navigationOptions:{
      tabBarLabel: '最热',
      tabBarIcon:({tintColor ,focused}) =>(
          <MaterialIcons
              name={'whatshot'}
              size={26}
              style={{color: tintColor}}
          />
      ),
    }
  },
  TrendingPage:{
    screen:TrendingPage,
    navigationOptions:{
      tabBarLabel: '趋势',
      tabBarIcon:({tintColor ,focused}) =>(
          <Ionicons
              name={'md-trending-up'}
              size={26}
              style={{color: tintColor}}
          />
      ),
    }
  },
  FavoritePage:{
    screen:FavoritePage,
    navigationOptions:{
      tabBarLabel: '收藏',
      tabBarIcon:({tintColor ,focused}) =>(
          <MaterialIcons
              name={'favorite'}
              size={26}
              style={{color: tintColor}}
          />
      ),
    }
  },
  MyPage:{
    screen:MyPage,
    navigationOptions:{
      tabBarLabel: '我的',
      tabBarIcon:({tintColor ,focused}) =>(
          <Entypo
              name={'user'}
              size={26}
              style={{color: tintColor}}
          />
      ),
    }
  }
};

class DynamicTabNavigator extends Component<Props> {
  constructor(props){
    super(props);
   // console.disableYellowBox = true;   //取消Warning界面
  }

  _tabNavigator(){
    //解决每次返回到首页
    if (this.Tabs){
        return this.Tabs;
    }
    const {PopularPage,TrendingPage,FavoritePage,MyPage} = TABS;
    const tabs ={PopularPage,TrendingPage,FavoritePage,MyPage};//根据需要定制显示的Tab
   // tabs.MyPage.navigationOptions.tabBarLabel = "我的";  //这里动态显示该界面

   // tabs.PopularPage.navigationOptions.tabBarLabel = "最新";


    const  bottomNavigator  = createBottomTabNavigator(tabs,{
         tabBarComponent: props => {
            return <TabBarComponent theme={this.props.theme}{...props}/>
         }
        }
    );
    return this.Tabs =  createAppContainer(bottomNavigator);   //react-navigation3.x的特性
  }

  render() {
    /**
     * 需要注意的是，navigation已经在homepage进行渲染了，这里不需要重复调用，否则覆盖不能使用
     * @type {react-navigation3.x的特性}
     */
    // NavigationUtil.navigation = this.props.navigation;
      const Tab = this._tabNavigator();
      return <Tab
          onNavigationStateChange={(prevState, newState, action)=>{
                   EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select,{ //发送底部tab切换的事件
                     from: prevState.index,
                     to:newState.index,
                   })
             }}
      />

  }
}

class TabBarComponent extends React.Component{
  constructor(props){
    super(props);
    this.theme={
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    }
  }
  render(){
    // const {routes,index} = this.props.navigation.state;
    // if (routes[index].params){
    //   const {theme} = routes[index].params;
    //   //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
    //   if (theme&&theme.updateTime>this.theme.updateTime){
    //     this.theme = theme;
    //   }
    // }
     return <BottomTabBar
         {...this.props}
        //  activeTintColor={this.theme.tintColor||this.props.activeTintColor}
        activeTintColor={this.props.theme.themeColor}
     />
  }
}
const mapStateToProps = state =>({
   theme: state.theme.theme,
});

export  default  connect(mapStateToProps)(DynamicTabNavigator);

