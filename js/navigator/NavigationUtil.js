/**
 * 全局盗汗跳转工具类
 */

export default class NavigationUtil{

    /**
     * 返回上一页
     * @param navigation
     */
    static resetTOHomePage(navigation){
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
