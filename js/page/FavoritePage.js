/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";
import NavigationBar from "../common/NavigationBar";

const THEME_COLOR = '#678';
type Props = {};
class FavoritePage extends Component<Props> {
    render() {

         let statusBar = {
             backgroundColor: THEME_COLOR,
             barStyle: 'light-content',
         };

         let navigationBar = <NavigationBar
             title = {'收藏'}
             statusBar = {statusBar}
             style = {{backgroundColor:THEME_COLOR}}
         />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Button
                        title="改变主题色"
                        onPress={() =>{
                            this.props.onThemeChange('#278')
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
export default connect(mapStateToProps,mapDispatchToProps)(FavoritePage);
