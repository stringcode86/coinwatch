package uk.co.coinwatch.modules.marketDetail

import uk.co.coinwatch.common.viewModels.MarketViewModel

sealed class MarketDetailViewModel {
    object Loading: MarketDetailViewModel()
    data class Error(val error: Throwable): MarketDetailViewModel()
    data class Loaded(val market: MarketViewModel): MarketDetailViewModel()
}