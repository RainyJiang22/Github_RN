import {onThemeChange,onThemeInit,onShowCustomThemeView} from "./theme";
import {onLoadPopularData,onLoadMorePopular,onFlushPopularFavorite} from "./popular";
import {onRefreshTrending,onLoadMoreTrending,onFlushTrendingFavorite} from "./trending";
import {onLoadFavoriteData} from "./favorite";
import {onLoadLanguage} from "./language";
import {onSearch,onLoadMoreSearch,onSearchCancel} from "./search";

export default {
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onRefreshTrending,
    onLoadMoreTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguage,
    onThemeInit,
    onShowCustomThemeView,
    onSearch,
    onSearchCancel,
    onLoadMoreSearch,
}
