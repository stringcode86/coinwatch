package uk.co.coinwatch.modules.favorite

import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.modules.marketDetail.MarketDetailViewModel

sealed class FavoriteViewModel {
    object Loading: FavoriteViewModel()
    data class Error(val error: Throwable): FavoriteViewModel()
    data class Loaded(val markets: List<MarketViewModel>): FavoriteViewModel()
}

fun FavoriteViewModel.markets(): List<MarketViewModel> = when (this) {
    is FavoriteViewModel.Loaded -> this.markets
    else -> emptyList()
}