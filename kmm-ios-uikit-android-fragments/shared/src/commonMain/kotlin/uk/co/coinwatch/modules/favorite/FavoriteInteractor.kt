package uk.co.coinwatch.modules.favorite

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market

interface FavoriteInteractor {
    @Throws(Throwable::class)
    suspend fun fetchFavorite(): List<Market>
}

class DefaultFavoriteInteractor(
    val service: CoinGeckoService
): FavoriteInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchFavorite(): List<Market> = withContext(Dispatchers.Default) {
        val markets = service.market()
        return@withContext markets
    }
}