package uk.co.coinwatch.modules.marketDetail

import uk.co.coinwatch.common.utils.Formatter
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class MarketDetailViewModel {
    data class Error(val error: Throwable): MarketDetailViewModel()
    data class Loading(val imgUrl: String?): MarketDetailViewModel()
    data class Loaded(
        val id: String,
        val name: String,
        val imgUrl: String?,
        val price: String?,
        val up: Boolean?,
        val pctChange: String?,
        val vol: String?,
        val mrkCap: String?,
        val sparkLine: List<Double>?,
        val isFavorite: Boolean,
        val rank: Long?,
        val supply: String?,
        val circulatingSupply: String?,
    ): MarketDetailViewModel() {
        companion object
    }
}
fun MarketDetailViewModel.Loaded.Companion.from(
    market: Market,
    isFavorite: Boolean
): MarketDetailViewModel.Loaded {
    val up = (market.priceChange24h ?: 0.0) > 0.0
    return MarketDetailViewModel.Loaded(
        market.id,
        market.name,
        market.image,
        Formatter.simpleNumToStr(market.currentPrice, prefix = "$"),
        up,
        Formatter.simpleNumToStr(market.priceChangePercentage24h, suffix = "%"),
        Formatter.abbreviated(market.totalVolume),
        Formatter.abbreviated(market.marketCap),
        market.sparkline7d?.price,
        isFavorite,
        market.marketCapRank,
        Formatter.abbreviated(market.circulatingSupply),
        Formatter.abbreviated(market.totalSupply),
    )
}
