package uk.co.coinwatch.modules.home

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market

interface HomeInteractor {
    @Throws(Throwable::class)
    suspend fun fetchMarkets(page: Int = 0): List<Market>
    @Throws(Throwable::class)
    suspend fun search(term: String?): List<Market>
}

class DefaultHomeInteractor(val service: CoinGeckoService): HomeInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchMarkets(page: Int): List<Market> =
        withContext(Dispatchers.Default) {
            return@withContext service.market(page=page)
        }

    @Throws(Throwable::class)
    override suspend fun search(term: String?): List<Market> =
        withContext(Dispatchers.Default) {
            if (term.isNullOrEmpty()) return@withContext emptyList()
            val ids = service.search(term).map { it.id }
            return@withContext service.market(if (ids.isEmpty()) null else ids)
        }
}
