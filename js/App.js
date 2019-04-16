
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store';

type Props = {};
export default class App extends Component<Props> {
  render() {
    /**
     * 将store传递给App框架
     */
    return <Provider store={store}>
      <AppNavigator/>
    </Provider>
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
});
