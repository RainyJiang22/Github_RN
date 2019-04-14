/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

import NavigationUtil from "../navigator/NavigationUtil";


type Props = {};
export default class Splash extends Component<Props> {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <Swiper style={styles.wrapper}>

         <View style={styles.slide1}>
          <Text style={styles.text}>这是一款Github Trending</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>内含多种语言,可随意切换</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>程序员的开源代码库</Text>
        </View>
        <View style={styles.slide4}>
          <Text onPress={() => {
              NavigationUtil.goPage({},"HomePage")
          }}>马上体验</Text>
        </View>
      </Swiper>
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
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#984357',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  btn: {
    borderWidth: 1,
    borderColor: "#a1a24a",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
    borderRadius: 5,
    alignItems: 'flex-end',
    backgroundColor: '#a1a24a',
    color: "#fff"
  }
});
