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
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'; //按照点赞数来排序
//const TITLE_COLOR = '#2a8ffa';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
type Props = {};
class PopularPage extends Component<Props> {

  //顶部导航动态显示
  constructor(props){
    super(props);
    // this.tabNames =['Java','Android','iOS','React','React Native','PHP'];
    console.disableYellowBox = true; //取消Warning界面
      const {onLoadLanguage} = this.props;
      onLoadLanguage(FLAG_LANGUAGE.flag_key);
  }
  _genTabs(){
    const tabs={};
    const {keys,theme} = this.props;
    keys.forEach((item,index)=>{
        if (item.checked){
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item.name} theme={theme}/>,  //传递数据
                navigationOptions:{
                    title:item.name
                }
            }
        }
    });
    return tabs;
  }


  // //react-navigation3.x的特性
  // _tabTopNavigator(){
  //     const {keys} = this.props;
  //   const TabNavigator = keys.length > 0 ? createMaterialTopTabNavigator(
  //       this._genTabs(),{
  //         tabBarOptions:{
  //           tabStyle:styles.tableStyle,
  //           upperCaseLabel:false, //是否使用标签大写
  //           scrollEnabled:true, //是否支持选项卡可以滚动
  //           style:{
  //             backgroundColor:"#2a8ffa", //配置tab的背景色
  //             height:40, //设置固定的高度
  //           },
  //           indicatorStyle:styles.indicatorStyle, //指示器的颜色
  //           labelStyle:styles.labelStyle, //文字的样式
  //
  //         }
  //       }
  //   ): null;
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




  //获取右边按钮,搜索和菜单
    getRightButton(){
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                }}
            >
                <View style={{padding:5,marginRight: 8,flexDirection:'row'}}>
                    <View style={{marginRight: 12}}>
                        <AntDesign
                            name={'search1'}
                            size={21}
                            style={{color:'white'}}
                        />
                    </View>
                    <Foundation
                        name={'align-right'}
                        size={21}
                        style={{color:'white'}}
                    />
                </View>

            </TouchableOpacity>
        </View>
    }


  render() {
      const {keys,theme} = this.props;
      let statusBar={
          backgroundColor: theme.themeColor,
          barStyle: 'light-content', //不设置也行
      };
      let navigationBar = <NavigationBar
        title={'最热'}
        statusBar={statusBar}
        style={theme.styles.navBar}
        rightButton={this.getRightButton()}
      />;

      const TabNavigator = keys.length ? createAppContainer(createMaterialTopTabNavigator(
          this._genTabs(), {
              tabBarOptions: {
                  tabStyle: styles.tabStyle,
                  upperCaseLabel: false,//是否使标签大写，默认为true
                  scrollEnabled: true,//是否支持 选项卡滚动，默认false
                  style: {
                      backgroundColor: theme.themeColor,//TabBar 的背景颜色
                      height: 40//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                  },
                  indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                  labelStyle: styles.labelStyle,//文字的样式
              },
              lazy: true //懒加载
          }
      )) : null;
    return <View style={{flex: 1}}>
        {navigationBar}
        {TabNavigator && <TabNavigator/> }
    </View>
  }
}

//订阅，获取key值
const mapPopularStateToProps = state => ({
    keys: state.language.keys,
    theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);


const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component<Props> {
   constructor(props){
       super(props);
       const {tabLabel} = this.props;
       this.storeName = tabLabel;
       this.isFavoriteChanged = false;
   }
   componentDidMount() {
       this.loadData();
       //1.底部tab监听,收藏页面发送变化的监听
       EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangeListener = () => {
           this.isFavoriteChanged = true;
       });
       EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
           if (data.to === 0 && this.isFavoriteChanged) {
               this.loadData(null, true);
           }
       })
   }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }


    loadData(loadMore,refreshFavorite){
       const {onLoadPopularData,onLoadMorePopular,onFlushPopularFavorite} = this.props;
       const store = this._store();
       const url = this.genFetchUrl(this.storeName);
       if (loadMore){
           //下拉加载更多
           onLoadMorePopular(this.storeName, ++store.pageIndex,pageSize,store.items,favoriteDao,callback=>{
               this.refs.toast.show('没有更多了');
           })
           //刷新收藏状态
       }else if(refreshFavorite){
         onFlushPopularFavorite(this.storeName,store.pageIndex,pageSize,store.items);
       } else{
           //否则上拉刷新
           onLoadPopularData(this.storeName,url,pageSize,favoriteDao)
       }

   }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }



    renderItem(data){
       const item = data.item;
       const {theme} = this.props;
       return <PopularItem
          projectModel ={item}
          theme={theme}
          //点击跳转到每个Item的详情页
          onSelect={(callback)=>{
              NavigationUtil.goPage({
                  theme,
                  projectModel: item,
                  flag:FLAG_STORAGE.flag_popular,
                  callback,
              },'DetailPage')
          }}
          onFavorite={(item,isFavorite) => FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)}
       />
    }

    genIndicator(){
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
    const {theme} = this.props;
    let store = this._store();
    return (
        <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={data=>this.renderItem(data)}
                keyExtractor={item=>""+ item.item.id}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={theme.themeColor}
                        colors={[theme.themeColor]}
                        refreshing={store.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={theme.themeColor}
                    />
                }

                //这里是解决下拉加载重复更新，每次只显示自定义pageSize，我这里是一次加载10个数据，
                //下拉加载更多的优化
                ListFooterComponent={()=> this.genIndicator()}
                onEndReached={() => {
                    console.log('---onEndReached----');
                    setTimeout(() => {
                        if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                            this.loadData(true);
                            this.canLoadMore = false;
                        }
                    }, 100);
                }}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                    this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                    console.log('---onMomentumScrollBegin-----')
                }}
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
    popular: state.popular
});
const mapDispatchToProps =  dispatch => ({
   onLoadPopularData:(storeName,url,pageSize,favoriteDao)=> dispatch(actions.onLoadPopularData(storeName,url,pageSize,favoriteDao)),
    onLoadMorePopular: (storeName,pageIndex,pageSize,items,favoriteDao,callback) =>  dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao,callback)),
    onFlushPopularFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
});

//创建函数
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab);

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
