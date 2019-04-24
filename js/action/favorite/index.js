import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';
import {_projectModels, handleData} from '../ActionUtil';
import FavoriteDao from "../../expand/dao/FavoriteDao";
import ProjectModel from "../../model/ProjectModel";

/**
 * 加载收藏的项目
 * @param flag
 * @param isShowLoading
 * @returns {Function}
 */

export function onLoadFavoriteData(flag, isShowLoading){
    return dispatch => {
        if (isShowLoading){
            dispatch({type: Types.FAVORITE_LOAD_DATA,storeName:flag});
        }
        new FavoriteDao(flag).getAllItems()
            .then(items =>{
                let resultData = [];
                for(let i=0,len=items.length; i < len;i++){
                    resultData.push(new ProjectModel(items[i],true));
                }
                dispatch({type:Types.FAVORITE_LOAD_SUCCESS,projectModels: resultData,storeName:flag});
            })
            .catch(e =>{
                console.log(e);
                dispatch({type:Types.FAVORITE_LOAD_FAIL,error: e ,storeName:flag});
            })
    }
}
