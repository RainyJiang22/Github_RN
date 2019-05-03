/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *关于界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Linking} from 'react-native';
import {MORE_MENU} from "../../common/MORE_MENU";
import GlobalStyles from "../../res/GlobalStyles";
import ViewUtil from "../../util/ViewUtil";
import NavigationUtil from "../../navigator/NavigationUtil";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import config from '../../.././github_app_config';
const THEME_COLOR = '#2a8ffa';

type Props = {};
export  default  class AboutPage extends Component<Props> {
   //实例化
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
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
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName='WebViewPage';
                params.title = '教程';
                params.url = 'https://facebook.github.io/react-native/';
                break;
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
