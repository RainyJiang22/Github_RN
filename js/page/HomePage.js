/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *主界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import {BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
import BackPressComponent from "../common/BackPressComponent";


type Props = {};

class HomePage extends Component<Props> {
  constructor(props){
    super(props);
    this.backPress = new BackPressComponent({backPress: this.onBackPress()})
  }
  componentDidMount() {
    //BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
     this.backPress.componentDidMount();
    }

  componentWillUnmount() {
    //BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    this.backPress.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
   * @returns {boolean}
   */
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
      NavigationUtil.navigation = this.props.navigation;
     // const Tab = this._tabNavigator();
      return <DynamicTabNavigator/>
  }
}

const mapStateToProps  = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(HomePage);

