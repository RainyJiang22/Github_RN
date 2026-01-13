/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *主界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import NavigationUtil, {navigationRef} from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import CustomTheme from '../page/CustomTheme';
import {connect} from 'react-redux';
import BackPressComponent from "../common/BackPressComponent";
import actions from "../action";

class HomePage extends Component {
  constructor(props){
    super(props);
    this.backPress = new BackPressComponent({backPress: this.onBackPress()})
  }
  componentDidMount() {
     this.backPress.componentDidMount();
    }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  /**
   * 处理 Android 中的物理返回键
   * React Navigation v7使用navigation ref处理返回
   * @returns {boolean}
   */
  onBackPress = () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
      return true;
    }
    return false;
  };


  renderCustomThemeView(){
    const {customThemeViewVisible, onShowCustomThemeView} = this.props;
    return (<CustomTheme
       visible = {customThemeViewVisible}
        {...this.props}
        onClose={() => onShowCustomThemeView(false)}
    />)
  }

  render() {
      return <View style={{flex:1}}>
       <DynamicTabNavigator/>
      {this.renderCustomThemeView()}
      </View>
  }
}

//订阅 - React Navigation v7不再需要nav state
const mapStateToProps  = state => ({
  customThemeViewVisible: state.theme.customThemeViewVisible,
});

const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});


export default connect(mapStateToProps,mapDispatchToProps)(HomePage);