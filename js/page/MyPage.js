/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *我的界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
//import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";

const THEME_COLOR = '#2a8ffa';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


type Props = {};
class MyPage extends Component<Props> {

    //顶部动态显示导航
    constructor(props){
        super(props);
    }


    getRightButton(){
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
              }}
            >
                <View style={{padding:5,marginRight: 8}}>
                    <AntDesign
                       name={'search1'}
                       size={21}
                       style={{color:'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callBack){
          return <TouchableOpacity
            style={{padding: 8,paddingLeft:12}}
              onPress={callBack}>
              <Ionicons
                 name={'md-arrow-back'}
                 size={24}
                 style={{color:'white'}}
              />

          </TouchableOpacity>
    }

    render() {

        let statusBar={
            backgroundColor: THEME_COLOR,
            barStyle:'light-content',
        };

        let navigationBar = <NavigationBar
         title={'我的'}
         statusBar={statusBar}
         style={{backgroundColor:THEME_COLOR}}
         rightButton={this.getRightButton()}
         leftButton={this.getLeftButton()}
        />;

        return  (
            <View style={{flex: 1}}>
            {navigationBar}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
