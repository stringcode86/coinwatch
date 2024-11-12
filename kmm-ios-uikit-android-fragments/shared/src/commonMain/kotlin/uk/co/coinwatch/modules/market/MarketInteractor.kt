package uk.co.coinwatch.modules.market

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market

interface MarketInteractor {
    @Throws(Throwable::class)
    suspend fun fetchMarket(): List<Market>
}

class DefaultMarketInteractor(
    val service: CoinGeckoService
): MarketInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchMarket(): List<Market> = withContext(Dispatchers.Default) {
        val markets = service.market()
        return@withContext markets
    }
}