/**
 * 全局导航跳转工具类
 */

import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export default class NavigationUtil{

    /**
     * 跳转到指定页面
     * @param params 要传递的参数
     * @param page  要跳转的页面名
     */
    static goPage(params, page){
        if (navigationRef.isReady()) {
            navigationRef.navigate(page, params);
        } else {
            console.log('NavigationUtil: navigation is not ready');
        }
    }


    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation){
        if (navigation?.canGoBack()) {
            navigation.goBack();
        } else if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    }

    /**
     * 重置到首页
     * @param params
     */
    static resetTOHomePage(params){
        if (navigationRef.isReady()) {
            navigationRef.navigate('Main', {
                screen: 'HomePage'
            });
        }
    }

    /**
     * 导航到Splash页面
     */
    static navigateToSplash() {
        if (navigationRef.isReady()) {
            navigationRef.navigate('Splash');
        }
    }
}