package uk.co.coinwatch.modules.home

import uk.co.coinwatch.common.viewModels.MarketViewModel

sealed class HomeViewModel {
    object Loading: HomeViewModel()
    data class Error(val error: Throwable): HomeViewModel()
    data class Loaded(val markets: List<MarketViewModel>): HomeViewModel()
}