/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *我的界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Linking} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
//import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";

const THEME_COLOR = '#2a8ffa';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MORE_MENU} from "../common/MORE_MENU";
import GlobalStyles from "../res/GlobalStyles";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";


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

    // getLeftButton(callBack){
    //       return <TouchableOpacity
    //         style={{padding: 8,paddingLeft:12}}
    //           onPress={callBack}>
    //           <Ionicons
    //              name={'md-arrow-back'}
    //              size={24}
    //              style={{color:'white'}}
    //           />
    //
    //       </TouchableOpacity>
    // }

    onClick(menu){
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName='WebViewPage';
                params.title = '教程';
                params.url = 'https://facebook.github.io/react-native/';
                break;
            case MORE_MENU.About:
                RouteName='AboutPage';
                break;
            case MORE_MENU.About_Author:
                RouteName='AboutMyPage';
                break;


                //反馈
            case MORE_MENU.Feedback:
                const url = 'mailto:3434481891@qq.com';
                Linking.canOpenURL(url)
                    .then(support => {
                        if (!support) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            Linking.openURL(url);
                        }
                    }).catch(e => {
                    console.error('An error occurred', e);
                });
                break;
        }


        if (RouteName){
            NavigationUtil.goPage(params,RouteName);
        }
    }


    getItem(menu){
        return ViewUtil.getMenuItem(() => this.onClick(menu),menu,THEME_COLOR);
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
       //  leftButton={this.getLeftButton()}
        />;

        return  (
            <View style={GlobalStyles.root_container}>
            {navigationBar}
            <ScrollView>
                <TouchableOpacity
                    style={styles.item}
                   onPress={() => this.onClick(MORE_MENU.About)}
                >
                    <View style={styles.about_left}>
                        <Ionicons
                            name={MORE_MENU.About.icon}
                            size={40}
                            style={{
                                marginRight: 10,
                                color:THEME_COLOR,
                            }}
                        />
                        <Text>GitHub 账户</Text>
                    </View>
                    <Ionicons
                        name={'ios-arrow-forward'}
                        size={16}
                        style={{
                            marginRight: 10,
                            alignSelf: 'center',
                            color: THEME_COLOR,
                        }}/>
                </TouchableOpacity>
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Tutorial)}
                {/*趋势管理*/}
                <Text style={styles.groupTitle}>趋势管理</Text>
                {/*自定义语言*/}
                {this.getItem(MORE_MENU.Custom_Language)}
                {/*语言排序*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Language)}


                {/*最热管理*/}
                <Text style={styles.groupTitle}>最热管理</Text>
                {/*自定义标签*/}
                {this.getItem(MORE_MENU.Custom_Key)}
                {/*标签排序*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Key)}
                {/*标签移除*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Remove_Key)}

                {/*设置*/}
                <Text style={styles.groupTitle}>设置</Text>
                {/*自定义主题*/}
                {this.getItem(MORE_MENU.Custom_Theme)}
                {/*关于作者*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.About_Author)}
                <View style={GlobalStyles.line}/>
                {/*反馈*/}
                {this.getItem(MORE_MENU.Feedback)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.CodePush)}
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
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
    item:{
        backgroundColor:'white',
        padding : 10,
        height  : 60,
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    groupTitle:{
        marginLeft:10,
        marginTop:10,
        marginBottom: 5,
        fontSize: 12,
        color:'gray',
    }
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
