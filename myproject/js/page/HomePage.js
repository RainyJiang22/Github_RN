/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';

import {createBottomTabNavigator,
  createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';

export default class HomePage extends Component<Props> {
  _tabNavigator(){
    const BotttomNavigator =  createBottomTabNavigator({
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
    });
    return createAppContainer(BotttomNavigator);
  }

  render() {
      const Tab = this._tabNavigator();
      return <Tab/>
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
