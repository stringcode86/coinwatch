package uk.co.coinwatch.modules.home

import uk.co.coinwatch.common.viewModels.MarketViewModel

sealed class HomeViewModel {
    data class Loading(val prev: List<MarketViewModel>): HomeViewModel()
    data class Loaded(val markets: List<MarketViewModel>): HomeViewModel()
    data class Error(val error: Throwable): HomeViewModel()
}

fun HomeViewModel.markets(): List<MarketViewModel> = when(this) {
    is HomeViewModel.Loaded -> this.markets
    is HomeViewModel.Loading -> this.prev
    is HomeViewModel.Error -> emptyList()
}

