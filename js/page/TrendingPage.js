/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *趋势界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import {connect} from 'react-redux';
import actions from  '../action/index';
import NavigationBar from "../common/NavigationBar";



const THEME_COLOR = '#678';
type Props = {};
class TrendingPage extends Component<Props> {
  render() {
     let statusBar = {
           backgroundColor: THEME_COLOR,
           barStyle:'light-content', //不设置也行
     };

     let navigationBar = <NavigationBar
           title={'趋势'}
           statusBar={statusBar}
           style={{backgroundColor:THEME_COLOR}}
     />;

    return (
      <View style={styles.container}>
        {navigationBar}

        <View style={styles.ThemeButton}>
            <Button
                title="改变主题色"
                onPress={() =>{
                    this.props.onThemeChange('#094')
                }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   },
    ThemeButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage);
