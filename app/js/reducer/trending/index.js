import Types from '../../action/types';

const defaultState = {};

/**
 * popular;{
 *     java:{
 *         items:[],
 *         isLoading:false,
 *     },
 *     ios：{
 *         items:[],
 *         isLoading:false,
 *     }
 * }
 *
 * state树，横向扩展，不固定
 * 如何动态的设置store，和动态获取store
 * @param state
 * @param action
 * @returns {{theme: ({comment: string, content: string, prop: string, tag: string, value: string}|*|string|onAction)}}
 */
export default function onAction(state= defaultState,action){
     switch (action.type) {
         case Types.TRENDING_REFRESH_SUCCESS: //下拉刷新成功
             return{
                 ...state,
                 [action.storeName] : {
                     ...state[action.storeName],
                     items:action.items, //原始数据
                     projectModels: action.projectModels, //此次要展示的数据
                     isLoading:false,
                     hideLoadingMore:false,
                     pageIndex:action.pageIndex
                 },
             };
         case Types.TRENDING_REFRESH: //下拉刷新
               return {
                   ...state,
                   [action.storeName] : {
                       ...state[action.storeName],
                       isLoading:true,
                       hideLoadingMore: true,
                   },
               };
         case Types.TRENDING_REFRESH_FAIL:
             return {
                 ...state,
                 [action.storeName] : {
                     ...state[action.storeName],
                     isLoading:false,
                 },
             };
         case Types.TRENDING_LOAD_MORE_SUCCESS: //上拉加载更多
             return {
                ...state,
                    [action.storeName] : {
                        ...state[action.storeName],
                        projectModels: action.projectModels,
                        hideLoadingMore: false,
                        pageIndex: action.pageIndex,
                    },
             };
         case Types.TRENDING_LOAD_MORE_FAIL: //上拉加载更多失败
             return {
                 ...state,
                 [action.storeName] : {
                     ...state[action.storeName],
                     hideLoadingMore: true,
                     pageIndex: action.pageIndex,
                 },
             };
         case Types.TRENDING_FLUSH_FAVORITE://刷新收藏状态
             return {
                 ...state,
                 [action.storeName]: {
                     ...state[action.storeName],
                     projectModels: action.projectModels,
                 }
             };
         default:
             return state;
     }
}
