package uk.co.coinwatch.modules.favorite

sealed class FavoriteViewModel {
    object Loading: FavoriteViewModel()
    data class Error(val error: Throwable): FavoriteViewModel()
    data class Loaded(val markets: List<Market>): FavoriteViewModel() {
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