import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import AboutPage from '../page/about/AboutPage';
import WebViewPage from "../page/WebViewPage";
import AboutMyPage from "../page/about/AboutMyPage";
import Splash from '../swiper/Splash';
import CustomKeyPage from "../page/CustomKeyPage";
import SortKeyPage from "../page/SortKeyPage";
import SearchPage from "../page/SearchPage";

const Stack = createNativeStackNavigator();

// 主导航器 - 包含所有主应用页面
function MainNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="DetailPage" component={DetailPage} />
            <Stack.Screen name="WebViewPage" component={WebViewPage} />
            <Stack.Screen name="AboutPage" component={AboutPage} />
            <Stack.Screen name="AboutMyPage" component={AboutMyPage} />
            <Stack.Screen name="CustomKeyPage" component={CustomKeyPage} />
            <Stack.Screen name="SortKeyPage" component={SortKeyPage} />
            <Stack.Screen name="SearchPage" component={SearchPage} />
        </Stack.Navigator>
    );
}

// 根导航器 - 使用Stack作为根容器，通过initialRouteName控制初始路由
export const RootNavigator = ({initialRouteName = 'Init'}) => {
    return (
        <Stack.Navigator 
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Init" component={WelcomePage} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
    );
};

export const rootCom = 'Init'; // 设置根路由