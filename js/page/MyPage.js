/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *我的界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};
class MyPage extends Component<Props> {
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>我的页面</Text>
                <Button
                    title="改变主题色"
                    onPress={() =>{
                        this.props.onThemeChange('#930')
                    }}/>

                <Text onPress={() =>{
                    NavigationUtil.goPage({
                        navigation:this.props.navigation
                    },"DetailPage")
                }}>跳转到详情页</Text>
                <Button
                    title={"DataStore使用"}
                    onPress={() =>{
                        NavigationUtil.goPage({
                            navigation:this.props.navigation
                        },"DataStoreDemoPage")
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
export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
