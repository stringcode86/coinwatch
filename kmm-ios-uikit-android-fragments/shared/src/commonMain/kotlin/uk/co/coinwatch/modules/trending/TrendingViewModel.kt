package uk.co.coinwatch.modules.trending

sealed class TrendingViewModel {
    object Loading: TrendingViewModel()
    data class Error(val error: Throwable): TrendingViewModel()
    data class Loaded(val markets: List<Market>): TrendingViewModel() {
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