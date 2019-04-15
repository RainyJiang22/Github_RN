/**
 * 全局盗汗跳转工具类
 */

export default class NavigationUtil{

    /**
     * 跳转到指定页面
     * @param params 要传递的参数
     * @param page  要跳转的页面名
     */
    static goPage(params,page){
        const navigation = NavigationUtil.navigation;
        if (!navigation){
            console.log('NavigationUtil can not be null');
            return;
        }
        navigation.navigate(
            page,
            {
              ...params
            }
        )
    }

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation){
        navigation.goBack();
    }

    /**
     * 重置到首页
     * @param params
     */
    static resetTOHomePage(params){
        const  {navigation} = params;
        navigation.navigate("Main");
    }
}
