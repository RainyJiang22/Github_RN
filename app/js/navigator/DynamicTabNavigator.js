/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *动态导航栏
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";

const Tab = createBottomTabNavigator();

class DynamicTabNavigator extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {theme} = this.props;
        return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => {
                        let IconComponent;
                        let iconName;

                        if (route.name === 'PopularPage') {
                            IconComponent = MaterialIcons;
                            iconName = 'whatshot';
                        } else if (route.name === 'TrendingPage') {
                            IconComponent = Ionicons;
                            iconName = 'trending-up';
                        } else if (route.name === 'FavoritePage') {
                            IconComponent = MaterialIcons;
                            iconName = 'favorite';
                        } else if (route.name === 'MyPage') {
                            IconComponent = Entypo;
                            iconName = 'user';
                        }

                        return <IconComponent name={iconName} size={26} color={color} />;
                    },
                    tabBarActiveTintColor: theme?.themeColor || '#2a8ffa',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen 
                    name="PopularPage" 
                    component={PopularPage}
                    options={{tabBarLabel: '最热'}}
                    listeners={{
                        tabPress: () => {
                            // 发送底部tab切换的事件
                            EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                routeName: 'PopularPage',
                            });
                        },
                    }}
                />
                <Tab.Screen 
                    name="TrendingPage" 
                    component={TrendingPage}
                    options={{tabBarLabel: '趋势'}}
                    listeners={{
                        tabPress: () => {
                            EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                routeName: 'TrendingPage',
                            });
                        },
                    }}
                />
                <Tab.Screen 
                    name="FavoritePage" 
                    component={FavoritePage}
                    options={{tabBarLabel: '收藏'}}
                    listeners={{
                        tabPress: () => {
                            EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                routeName: 'FavoritePage',
                            });
                        },
                    }}
                />
                <Tab.Screen 
                    name="MyPage" 
                    component={MyPage}
                    options={{tabBarLabel: '我的'}}
                    listeners={{
                        tabPress: () => {
                            EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                routeName: 'MyPage',
                            });
                        },
                    }}
                />
            </Tab.Navigator>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);