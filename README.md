# 基于React-Native混合开发的Github客户端APP
打造一款基于React-Native混合开发的Github客户端APP

[![Nodejs](https://img.shields.io/badge/Download-v1.0.3-ff69b4.svg)](https://nodejs.org/en/download/)
[![npm](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://www.npmjs.com/package/npm)


## 目录

* [功能与特性](#功能与特性)
* [技术与框架](#技术与框架)
* [网络编程技术](#网络编程技术)
* [数据存储技术](#数据存储技术)
* [运行调试](#运行调试)



## 功能与特性

* 支持订阅多种编程语言;
* 支持添加/删除编程语言，并支持自定义它们的排序;
* 支持收藏喜欢的项目;
* 支持多种颜色主题自由切换;
* 支持搜索,并自持自定义订阅关键字;
* 支持分享,轻松将自己喜欢的项目分享给好友;

## 技术与框架

* react navigation 3.x,可以参考:[react navigation3.x](https://reactnavigation.org/docs/en/hello-react-navigation.html)
1. 在使用react-navigation3.x的时候，与之前的2.x大概有两种不同
2.  在导入react-navigation的时候2.x版本只需要`npm add`或者`npm install react-navigation`
      不同的是react-navigation3.x版本除了安装`npm install react-navigation`还需要导入`npm add react-native-gesture-handler`
3. 最后需要`react-native link` 将依赖导入到Android平台或者IOS平台
4.  react-navigation 安装后，需要在android包中的MainActivity.java添加以下代码
```
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "you project name";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
}
}
```
5.  不同的是，React Navigation3.x在创建堆栈导航器的时候，不可用createStackNavigator直接return，需要一个路由配置对象
它是一个Rect组件的返回函数，所以我们需要使用createAPPContainer（xxx）进行处理
`export default createAppContainer(AppNavigator);`
4. 还有一个小改动，React Navigation3.x除了在createStackNavigator使用navigationoptions时，在进行堆栈导航器的时候要使用defaultnavigationoptions，大致代码如下：
```
export  default createAppContainer(createSwitchNavigator({
    Init:{
        screen:InitNavigator
    },
    Splash:{
        screen:SplashNavigator
    },
    Main:{
        screen:MainNavigator
    } },{
            defaultNavigationOptions:{
                header:null //将header设为null
            }
    }));
```
* react-native swiper : [详情前点击☞](https://github.com/leecade/react-native-swiper)

* react-redux : [详情前点击☞](https://react-redux.js.org/)
1. 用户（操作View）发出方式用到dispatch方法
2. Store自动调用reducer，并且传入两个参数（当前State和收到的Action）,Reducer会返回新的State，如果有Middleware
3. State一旦有变化，Store就会调用监听函数，来更新View;
4. 可预测，可维护，可测试
5. [关于redux+navigation的搭建可查看慕课老师的手记](https://www.imooc.com/article/283337)

* 离线缓存框架
  1. 提升用户体验
  2. 节省流量 



## 网络编程技术
1. RN使用Fetch进行网络请求，Fetch可与XMLHttpRequest相媲美
2. fetch规范于JQuery.ajax()主要有两种方式的不同
 * 当收到代表错误的HTTP状态码，不会被标记为reject,状态码会变为404或500，它会将Promise状态标记为resolve
 * 默认情况下，fetch不会从服务端发送或者接收任何cookies，如果依赖于用户session，则会导致未经认证的请求
3. 使用的api
- URL:https://api.github.com/search/repositories?
- 查询所有的:q=stars:>1&sort=stars
- 分类查询：q=ios&sort=stars
```
  var API_URL ='https://api.github.com/search/repositories?q=ios&sort=stars';
  var API_URL ='https://api.github.com/search/repositories?q=stars:>1&sort=stars';
```


##  数据存储技术

1. 这里我们使用AsyncStorage
    - 简单的，异步的，持久化的key-value存储系统
    - AsyncStorage也是React Navtive官方推荐的数据存储方式
2. [详情前点击☞](https://facebook.github.io/react-native/docs/getting-started)


##  运行调试

1. 准备React Native环境,可参考: [Requirements](https://facebook.github.io/react-native/docs/getting-started.html#requirements)。
2. Clone 之后，然后终端进入项目根目录。
3. 终端运行 `npm install`。
4. 然后运行 `react-native run-ios` 或 `react-native run-android`。
