package uk.co.coinwatch.modules.market

sealed class MarketViewModel {
    object Loading: MarketViewModel()
    data class Error(val error: Throwable): MarketViewModel()
    data class Loaded(val markets: List<Market>): MarketViewModel() {
        data class Market(
            val id: String,
            val name: String,
            val imgUrl: String?,
            val price: String?,
            val up: Boolean?,
            val pctChange: String?,
            val volCap: String?,
            val mrkCap: String?,
        )
    }
}