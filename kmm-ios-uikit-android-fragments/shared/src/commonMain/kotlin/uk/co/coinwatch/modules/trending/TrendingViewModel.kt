package uk.co.coinwatch.modules.trending

import uk.co.coinwatch.common.viewModels.MarketViewModel

sealed class TrendingViewModel {
    object Loading: TrendingViewModel()
    data class Error(val error: Throwable): TrendingViewModel()
    data class Loaded(val markets: List<MarketViewModel>): TrendingViewModel()
}
