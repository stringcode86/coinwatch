package uk.co.coinwatch.modules.marketDetail

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market

interface MarketDetailInteractor {
    @Throws(Throwable::class)
    suspend fun fetchMarket(): List<Market>
}

class DefaultMarketDetailInteractor(
    val service: CoinGeckoService
): MarketDetailInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchMarket(): List<Market> = withContext(Dispatchers.Default) {
        val markets = service.market()
        return@withContext markets
    }
}