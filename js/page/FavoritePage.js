/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *最热界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import Toast from 'react-native-easy-toast'
import PopularItem from '../common/PopularItem';


import {
    createMaterialTopTabNavigator,
    createAppContainer
} from "react-navigation";
import NavigationBar from "../common/NavigationBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from 'react-native-vector-icons/Foundation';
import NavigationUtil from "../navigator/NavigationUtil";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
import TrendingItem from "../common/TrendingItem";
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";

//const TITLE_COLOR = '#2a8ffa';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
type Props = {};
class FavoritePage extends Component<Props> {

  //顶部导航动态显示
  constructor(props){
    super(props);
//    this.tabNames =['最热','趋势'];
    console.disableYellowBox = true; //取消Warning界面
  }


  //react-navigation3.x的特性
  // _tabTopNavigator(){
  //     const {theme} = this.props;
  //   const TabNavigator = createMaterialTopTabNavigator({
  //       'Popular': {
  //           screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} />,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
  //           navigationOptions: {
  //               title: '最热',
  //           },
  //       },
  //       'Trending': {
  //           screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} />,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
  //           navigationOptions: {
  //               title: '趋势',
  //           },
  //        },
  //        },{
  //         tabBarOptions:{
  //           tabStyle:styles.tableStyle,
  //           upperCaseLabel:false, //是否使用标签大写
  //           scrollEnabled:false, //是否支持选项卡可以滚动
  //           style:{
  //             backgroundColor:theme.themeColor, //配置tab的背景色
  //             height:40, //设置固定的高度
  //           },
  //           indicatorStyle:styles.indicatorStyle, //指示器的颜色
  //           labelStyle:styles.labelStyle, //文字的样式
  //
  //         }
  //       }
  //   );
  //   return  createAppContainer(TabNavigator);
  // }

    //优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建

    // _tabNav(){
    //       if (!this.tabNav) {
    //           this.tabNav = createAppContainer(createMaterialTopTabNavigator(
    //               this._genTabs(), {
    //                   tabBarOptions: {
    //                       tabStyle: styles.tabStyle,
    //                       upperCaseLabel: false,
    //                       scrollEnabled: true,
    //                       styles: {
    //                           backgroundColor: '#2a8ffa',
    //                           height: 40
    //                       }
    //                   }
    //               }
    //           ));
    //           return  this.tabNav;
    //       }
    //
    //           //
    //           // const TabNavigator = createMaterialTopTabNavigator(
    //           //     this._genTabs(),{
    //           //         tabBarOptions:{
    //           //             tabStyle:styles.tableStyle, //是否使用相关样式
    //           //             upperCaseLabel:false, //是否使用标签大写
    //           //             scrollEnabled:true, //是否支持选项卡可以滚动
    //           //             styles:{
    //           //                 backgroundColor:"#2a8ffa",
    //           //                 height:40,  //设置固定的高度
    //           //             },
    //           //             indicatorStyle:styles.indicatorStyle, //指示器的颜色
    //           //             labelStyle:styles.labelStyle, //文字样式
    //           //         }
    //           //     });
    //           // return createAppContainer(TabNavigator)
    // }




  render() {
      const {theme} = this.props;
      let statusBar={
          backgroundColor: theme.themeColor,
          barStyle: 'light-content', //不设置也行
      };
      let navigationBar = <NavigationBar
        title={'收藏'}
        statusBar={statusBar}
        style={theme.styles.navBar}
      />;

      const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
              'Popular': {
                  screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} theme={theme}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                  navigationOptions: {
                      title: '最热',
                  },
              },
              'Trending': {
                  screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} theme={theme}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
                  navigationOptions: {
                      title: '趋势',
                  },
              },
          }, {
              tabBarOptions: {
                  tabStyle: styles.tabStyle,
                  upperCaseLabel: false,//是否使标签大写，默认为true
                  style: {
                      backgroundColor: theme.themeColor,//TabBar 的背景颜色
                      height: 40//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                  },
                  indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                  labelStyle: styles.labelStyle,//文字的样式
              }
          }
      ));
    return <View style={{flex: 1}}>
        {navigationBar}
        <TabNavigator/>
    </View>

  }
}

const mapFavoriteStateToProps = state => ({
    theme: state.theme.theme,
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapFavoriteStateToProps)(FavoritePage);

class FavoriteTab extends Component<Props> {
   constructor(props){
       super(props);
       const {flag} = this.props;
       this.storeName = flag;
       this.favoriteDao = new FavoriteDao(flag);
   }

    componentDidMount() {
        this.loadData(true);
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
            if (data.to === 2) {
                this.loadData(false);
            }
        })
    }

    //事件完成卸载的时候,及时销毁掉
   componentWillUnmount() {
       EventBus.getInstance().removeListener(this.listener);
   }

    loadData(isShowLoading){
       const {onLoadFavoriteData} = this.props;
       onLoadFavoriteData(this.storeName,isShowLoading);

   }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
            }
        }
        return store;
    }

    onFavorite(item, isFavorite) {
        FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.props.flag);
        if (this.storeName === FLAG_STORAGE.flag_popular) {
            EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
        } else {
            EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending);
        }
    }
    renderItem(data){
        const {theme} = this.props;
       const item = data.item;
        const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
       return <Item
          projectModel ={item}
          theme = {theme}
          onSelect={(callback)=>{
              NavigationUtil.goPage({
                  theme,
                  projectModel: item,
                  flag:FLAG_STORAGE.flag_popular,
                  callback,
              },'DetailPage')
          }}
          onFavorite={(item,isFavorite) => this.onFavorite(item,isFavorite)}
       />
    }


    render() {
    const {theme} = this.props;
    let store = this._store();
    return (
        <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={data=>this.renderItem(data)}
                keyExtractor={item=> "" + (item.item.id || item.item.fullName)}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={theme.themeColor}
                        colors={[theme.themeColor]}
                        refreshing={store.isLoading}
                        onRefresh={() => this.loadData(true)}
                        tintColor={theme.themeColor}
                    />
                }
            />

            <Toast
                ref={'toast'}
                position={'center'}
            />

        </View>
    );
  }

}
const mapStateToProps = state => ({
   favorite: state.favorite,
});
const mapDispatchToProps =  dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onLoadFavoriteData: (storeName, isShowLoading) => dispatch(actions.onLoadFavoriteData(storeName, isShowLoading)),
});

//创建函数
const FavoriteTabPage = connect(mapStateToProps,mapDispatchToProps)(FavoriteTab);

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
  tableStyle:{
    //  minWidth: 50
      padding : 0
  },
  indicatorStyle:{
    height:2,
    backgroundColor: '#F5FCFF',
  },
  labelStyle:{
     fontSize:13,
     margin:0,
  },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
