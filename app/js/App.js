import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './navigator/AppNavigator';
import store from './store';
import {navigationRef} from './navigator/NavigationUtil';

export default class App extends Component {
  render() {
    /**
     * 将store传递给App框架
     * React Navigation v7使用NavigationContainer管理navigation state
     */
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator initialRouteName="Init" />
        </NavigationContainer>
      </Provider>
    );
  }
}