package uk.co.coinwatch.common.viewModels

import uk.co.coinwatch.common.utils.Formatter
import uk.co.coinwatch.services.coinGecko.model.Market

data class MarketViewModel(
    val id: String,
    val name: String,
    val imgUrl: String?,
    val price: String?,
    val up: Boolean?,
    val pctChange: String?,
    val vol: String?,
    val mrkCap: String?,
    val sparkLine: List<Double>?,
) {
  companion object
}

fun MarketViewModel.Companion.from(market: Market): MarketViewModel {
    val up = (market.priceChange24h ?: 0.0) > 0.0
    val symbol = if (up) "▲" else "▼"
    return MarketViewModel(
        market.id,
        market.name,
        market.image,
        Formatter.simpleNumToStr(market.currentPrice, prefix = "$symbol $"),
        up,
        Formatter.simpleNumToStr(market.priceChangePercentage24h, suffix = "%"),
        "vol ${Formatter.abbreviated(market.totalVolume)}",
        "cap ${Formatter.abbreviated(market.marketCap)}",
        market.sparkline7d?.price,
    )
}
