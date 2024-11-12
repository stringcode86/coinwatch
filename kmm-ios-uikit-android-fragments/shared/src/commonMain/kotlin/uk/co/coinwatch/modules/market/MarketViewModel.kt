package uk.co.coinwatch.modules.market

import uk.co.coinwatch.common.viewModels.Market

sealed class MarketViewModel {
    object Loading: MarketViewModel()
    data class Error(val error: Throwable): MarketViewModel()
    data class Loaded(val markets: List<Market>): MarketViewModel()
}