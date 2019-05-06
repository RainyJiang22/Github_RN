/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *欢迎界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import SplashScreen from "react-native-splash-screen";
type Props = {};
class WelcomePage extends Component<Props> {
    //定时跳转
     componentDidMount(){
       this.timer = setTimeout(() => {
           SplashScreen.hide();
          NavigationUtil.resetTOHomePage({
              navigation:this.props.navigation
          })
       },200);
     }
      componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
     }

  render() {
    return null;
  }
}


//订阅
const mapDispatchToProps = dispatch =>({

});

export default connect(null, mapDispatchToProps)(WelcomePage);



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

});
