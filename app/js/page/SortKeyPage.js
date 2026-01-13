/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *自定义界面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import actions from '../action/index';
import NavigationBar from "../common/NavigationBar";
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import BackPressComponent from "../common/BackPressComponent";
import LanguageDao from "../expand/dao/LanguageDao";
import ViewUtil from "../util/ViewUtil";
import NavigationUtil from "../navigator/NavigationUtil";
import ArrayUtil from "../util/ArrayUtil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TITLE_COLOR = '#2a8ffa';
class SortKeyPage extends Component {

  //顶部导航动态显示
  constructor(props){
    super(props);
    console.disableYellowBox = true; //取消Warning界面
      // React Navigation v7: 使用 route.params 或 navigation.state.params (向后兼容)
      this.params = this.props.route?.params || this.props.navigation?.state?.params || {};
      this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
      this.lanuageDao = new LanguageDao(this.params.flag);
      this.state = {
          checkedArray: SortKeyPage._keys(this.props),
      }
  }

    static getDerivedStateFromProps(nextProps, prevState) {
      const  checkedArray = SortKeyPage._keys(nextProps,null,prevState);
         if (prevState.keys !== checkedArray ){
             return{
                 keys:checkedArray,
             }
         }
         return null;
    }


    /**
     * 获取标签
     * @param props
     * @param state
     * @returns {*}
     * @private
     */
    static _keys(props, state) {
        //如果state中有checkedArray则使用state中的checkedArray
        if (state && state.checkedArray && state.checkedArray.length) {
            return state.checkedArray;
        }

        //否则从原始数据中获取checkedArray
        const flag = SortKeyPage._flag(props);
        let dataArray = props.language[flag] || [];
        let keys = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            if (data.checked) keys.push(data);
        }
        return keys;
    }

    //从json文件中获取相应的数据
    static _flag(props){
        const params = props.route?.params || props.navigation?.state?.params || {};
        const {flag} = params;
        return flag === FLAG_LANGUAGE.flag_key ? "keys" : "languages";
    }


    //加载物理返回键
    onBackPress(e) {
        this.onBack();
        return true;
    }

    componentDidMount(){
        this.backPress.componentDidMount();
        //如果props中标签为空则从本地存储中获取标签
        if (SortKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }

    }

    componentWillUnmount(){
          this.backPress.componentWillUnmount();
    }


    /**
     * 保存此次数据的变更
     */
      onSave(hasChecked){
          if (!hasChecked){
              //如果没有排序则直接返回
              if (ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
                  NavigationUtil.goBack(this.props.navigation);
                  return;
              }
          }
          //更新数据
        this.lanuageDao.save(this.getSortResult());
          //重新加载排序后的数据，以便使得其他页面进行更新
        const {onLoadLanguage} = this.props;
        //更新store
        onLoadLanguage(this.params.flag);
        //返回上一页
        NavigationUtil.goBack(this.props.navigation);
      }


    /**
     * 获取排序后的标签结果
     * @returns {Array}
     */
    getSortResult() {
        const flag = SortKeyPage._flag(this.props);
        //从原始数据中复制一份数据出来，以便对这份数据进行进行排序
        let sortResultArray = ArrayUtil.clone(this.props.language[flag]);
        //获取排序之前的排列顺序
        const originalCheckedArray = SortKeyPage._keys(this.props);
        //遍历排序之前的数据，用排序后的数据checkedArray进行替换
        for (let i = 0, j = originalCheckedArray.length; i < j; i++) {
            let item = originalCheckedArray[i];
            //找到要替换的元素所在位置
            let index = this.props.language[flag].indexOf(item);
            //进行替换
            sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
        return sortResultArray;
    }



    /**
     * 返回
     * 同时需要判断是否修改相关状态
     */
    onBack() {
        if (!ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
            Alert.alert('提示', '要保存修改吗？',
                [
                    {
                        text: '否', onPress: () => {
                            NavigationUtil.goBack(this.props.navigation)
                        }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
                ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    /**
     * 拖拽完成后的回调
     */
    onDragEnd = ({ data, from, to }) => {
        this.setState({ checkedArray: data });
    }



    render() {
      let  title = this.params.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';
      // 从 params 获取 theme，如果没有则从 Redux store 获取
      const theme = this.params?.theme || this.props.theme;
      if (!theme || !theme.styles) {
        console.warn('SortKeyPage: Theme is not available');
        return null;
      }
      let navigationBar = <NavigationBar
        title={title}
        style={theme.styles.navBar}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        rightButton={ViewUtil.getRightButton('保存',()=>this.onSave())}
      />;

      return <View style={styles.container}>
          {navigationBar}
          <DraggableFlatList
              data={this.state.checkedArray}
              onDragEnd={this.onDragEnd}
              keyExtractor={(item, index) => `draggable-item-${index}`}
              renderItem={({ item, drag, isActive }) => (
                  <SortCell 
                      data={item} 
                      drag={drag}
                      isActive={isActive}
                      theme={theme}
                  />
              )}
          />
      </View>
  }
}


//自定义样式
class SortCell extends Component {
    render() {
        const {theme, data, drag, isActive} = this.props;
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={[
                styles.item,
                data.checked ? null : styles.hidden,
                isActive && styles.activeItem
            ]}
            onLongPress={drag}
            disabled={isActive}>
            <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{marginRight: 10, color: theme.themeColor}}/>
                <Text>{data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}

//订阅，获取key值
const mapPopularStateToProps = state => ({
    language: state.language,
    theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(SortKeyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    activeItem: {
        backgroundColor: "#E8E8E8",
        opacity: 0.8,
    },
});