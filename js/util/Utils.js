export default class Utils{
    /**
     * 检查该Item是否被收藏
     */
    static checkFavorite(item,keys =[]){
        if (!keys)
            return false;
        for(let i = 0,len = keys.length; i<len;i++){
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === keys[i]){
                return true;
            }
        }
        return false;
    }



}
