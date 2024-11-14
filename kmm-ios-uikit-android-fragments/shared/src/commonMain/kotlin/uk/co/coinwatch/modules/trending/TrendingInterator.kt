package uk.co.coinwatch.modules.trending

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market

interface TrendingInteractor {
    @Throws(Throwable::class)
    suspend fun fetchTrending(): List<Market>
}

class DefaultTrendingInteractor(
    val service: CoinGeckoService
): TrendingInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchTrending(): List<Market> =
        withContext(Dispatchers.Default) {
            val ids = service.trending().map { it.id }
            val markets = service.market(ids)
            return@withContext markets
        }
}