/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *关于界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Linking} from 'react-native';
import {connect} from 'react-redux';
import {MORE_MENU} from "../../common/MORE_MENU";
import GlobalStyles from "../../res/GlobalStyles";
import ViewUtil from "../../util/ViewUtil";
import NavigationUtil from "../../navigator/NavigationUtil";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from '../../../../github_app_config';
//const THEME_COLOR = '#2a8ffa';

class AboutPage extends Component {
   //实例化
    constructor(props) {
        super(props);
        // React Navigation v7: 使用 route.params 或 navigation.state.params (向后兼容)
        this.params = this.props.route?.params || this.props.navigation?.state?.params || {};
        this.aboutCommon = new AboutCommon({
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about,
            }, data => this.setState({...data})
        );
        this.state = {
            data: config,
        }
    }


    onClick(menu){
        // 从 params 获取 theme，如果没有则从 Redux store 获取
        const theme = this.params?.theme || this.props.theme;
        let RouteName, params = {theme};
        switch (menu) {
            //教程
            case MORE_MENU.Tutorial:
                RouteName='WebViewPage';
                params.title = '教程';
                params.url = 'https://facebook.github.io/react-native/';
                break;


                //进入关于作者
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
        // 从 params 获取 theme，如果没有则从 Redux store 获取
        const theme = this.params?.theme || this.props.theme;
        if (!theme) return null;
        return ViewUtil.getMenuItem(() => this.onClick(menu),menu,theme.themeColor);
    }

    render() {
        const content=<View>
            {/*教程*/}
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line}/>
            {/*关于作者*/}
            {this.getItem(MORE_MENU.About_Author)}
            {/*反馈*/}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Feedback)}
        </View>;
        return this.aboutCommon.render(content, this.state.data.app);
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(AboutPage);
