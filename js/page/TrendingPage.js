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

type Props = {};
class TrendingPage extends Component<Props> {
  render() {

    return (
      <View style={styles.container}>
         <Text style={styles.welcome}>趋势页面</Text>
        <Button
                title="改变主题色"
                onPress={() =>{
                     this.props.onThemeChange('#094')
                }}/>
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage);
