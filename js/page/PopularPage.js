/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *最新界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import Toast from 'react-native-easy-toast'
import PopularItem from '../common/PopularItem';

import {
    createMaterialTopTabNavigator,
    createAppContainer
} from "react-navigation";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars'; //按照点赞数来排序
const TITLE_COLOR = 'red';

type Props = {};
export default class PopularPage extends Component<Props> {

  //顶部导航动态显示
  constructor(props){
    super(props);
    this.tabNames =['Java','Android','iOS','React','React Native','PHP'];
  }
  _genTabs(){
    const tabs={};
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item}/>,  //传递数据
        navigationOptions:{
          title:item
        }
      }
    });
    return tabs;
  }


  //react-navigation3.x的特性
  _tabTopNavigator(){
    const TabNavigator = createMaterialTopTabNavigator(
        this._genTabs(),{
          tabBarOptions:{
            tabStyle:styles.tableStyle,
            upperCaseLabel:false, //是否使用标签大写
            scrollEnabled:true, //是否支持选项卡可以滚动
            style:{
              backgroundColor:"#678" //配置tab的背景色
            },
            indicatorStyle:styles.indicatorStyle, //指示器的颜色
            labelStyle:styles.labelStyle, //文字的样式

          }
        }
    );
    return  createAppContainer(TabNavigator);
  }



  render() {
    const TabNavigator = this._tabTopNavigator();
    return <TabNavigator/>
  }
}

const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component<Props> {
   constructor(props){
       super(props);
       const {tabLabel} = this.props;
       this.storeName = tabLabel;
   }
   componentDidMount() {
       this.loadData();
   }

   loadData(loadMore){
       const {onLoadPopularData,onLoadMorePopular} = this.props;
       const store = this._store();
       const url = this.genFetchUrl(this.storeName);
       if (loadMore){
           onLoadMorePopular(this.storeName, ++store.pageIndex,pageSize,store.items,callback=>{
               this.refs.toast.show('没有更多了');
           })
       } else{
           onLoadPopularData(this.storeName,url,pageSize)
       }

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

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data){
       const item = data.item;
       return <PopularItem
          item={item}
          onSelect={()=>{

          }}
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

    let store = this._store();
    return (
        <View style={styles.container}>
            <FlatList
                data={store.projectModels}
                renderItem={data=>this.renderItem(data)}
                keyExtractor={item=>""+ item.id}
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={TITLE_COLOR}
                        colors={[TITLE_COLOR]}
                        refreshing={store.isLoading}
                        onRefresh={() => this.loadData()}
                        tintColor={TITLE_COLOR}
                    />
                }
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
   onLoadPopularData:(storeName,url)=> dispatch(actions.onLoadPopularData(storeName,url)),
    onLoadMorePopular: (storeName,pageIndex,pageSize,items,callback) =>  dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,callback))
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
      minWidth: 50
  },
  indicatorStyle:{
    height:2,
    backgroundColor: '#F5FCFF',
  },
  labelStyle:{
     fontSize:13,
    marginTop:6,
    marginBottom: 6,
  },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
