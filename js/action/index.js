import {onThemeChange} from "./theme";
import {onLoadPopularData,onLoadMorePopular,onFlushPopularFavorite} from "./popular";
import {onRefreshTrending,onLoadMoreTrending,onFlushTrendingFavorite} from "./trending";
import {onLoadFavoriteData} from "./favorite";

export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
}
