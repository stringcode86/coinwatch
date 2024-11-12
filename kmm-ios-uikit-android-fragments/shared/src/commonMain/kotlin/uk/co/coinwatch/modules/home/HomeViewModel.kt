package uk.co.coinwatch.modules.home

sealed class HomeViewModel {
    object Loading: HomeViewModel()
    data class Error(val error: Throwable): HomeViewModel()
    data class Loaded(val markets: List<Market>): HomeViewModel() {
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