package uk.co.coinwatch.modules.favorite

import uk.co.coinwatch.common.viewModels.MarketViewModel

sealed class FavoriteViewModel {
    object Loading: FavoriteViewModel()
    data class Error(val error: Throwable): FavoriteViewModel()
    data class Loaded(val markets: List<MarketViewModel>): FavoriteViewModel()
}