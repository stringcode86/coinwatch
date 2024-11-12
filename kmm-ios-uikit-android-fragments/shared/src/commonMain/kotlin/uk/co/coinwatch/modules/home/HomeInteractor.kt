package uk.co.coinwatch.modules.home

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market

interface HomeInteractor {
    @Throws(Throwable::class)
    suspend fun fetchMarkets(): List<Market>
    @Throws(Throwable::class)
    suspend fun search(term: String): List<Market>
}

class DefaultHomeInteractor(
    val service: CoinGeckoService
): HomeInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchMarkets(): List<Market> = withContext(Dispatchers.Default) {
        val markets = service.market()
        return@withContext markets
    }

    @Throws(Throwable::class)
    override suspend fun search(term: String): List<Market> {
        println("[HomeInteractor] search $term")
        return emptyList()
    }

}