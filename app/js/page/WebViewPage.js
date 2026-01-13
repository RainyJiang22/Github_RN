/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *使用WebView开发详情页面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View,TouchableOpacity,WebView} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";
import {connect} from 'react-redux';
//const THEME_COLOR = '#2a8ffa';

class WebViewPage extends Component {
  constructor(props){
    super(props);
    // React Navigation v7: 使用 route.params 或 navigation.state.params (向后兼容)
    this.params = this.props.route?.params || this.props.navigation?.state?.params || {};
    const {title,url} = this.params;
    this.state ={
         title: title || '',
         url: url || '',
         canGoBack:false,  //是否可以返回到上一页
    };
    this.backPress = new BackPressComponent({backPress:()=> this.onBackPress()})
  }

  componentDidMount(){
      this.backPress.componentDidMount();
  }

  componentWillUnmount() {
      this.backPress.componentWillUnmount();
  }

  onBackPress(){
      this.onBack();
      return true;
  }

    onBack() {
       if(this.state.canGoBack){
           this.webView.goBack();
       }else{
         NavigationUtil.goBack(this.props.navigation);
       }
   }


  /**
   * 获取导航发生变化的事件
   */
  onNavigationStateChange(navState){
    this.setState({
       canGoBack:navState.canGoBack,
       url:navState.url,
    })
  }

  render() {
      // 从 params 获取 theme，如果没有则从 Redux store 获取
      const theme = this.params?.theme || this.props.theme;
      if (!theme || !theme.styles) {
        console.warn('WebViewPage: Theme is not available');
        return null;
      }
      const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
      let navigationBar = <NavigationBar
        title={this.state.title}
        style={theme.styles.navBar}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress()) }
      />;

    return (
      <View style={styles.container}>
        {navigationBar}
          <WebView
              ref={webView => this.webView = webView}
              startInLoadingState={true}
              onNavigationStateChange={e => this.onNavigationStateChange(e)}
              source={{uri:this.state.url}}
          />
      </View>
    );
  }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(WebViewPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});