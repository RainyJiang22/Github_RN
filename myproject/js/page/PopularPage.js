/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from "react-navigation";


type Props = {};
export default class PopularPage extends Component<Props> {
  _tabTopNavigator(){
    const TabNavigator = createMaterialTopTabNavigator({
      PopularTab1:{
        screen:PopularTab,
        navigationOptions:{
          title:'Java'
        }
      },
      PopularTab2:{
        screen:PopularTab,
        navigationOptions:{
          title:'C#'
        }
      },
      PopularTab3:{
        screen:PopularTab,
        navigationOptions:{
          title:'C++'
        }
      },
      PopularTab4:{
        screen:PopularTab,
        navigationOptions:{
          title:'Python'
        }
      },

      PopularTab5:{
        screen:PopularTab,
        navigationOptions:{
          title:'Android'
        }
      },
    });

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
});
