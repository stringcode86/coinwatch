package uk.co.coinwatch.modules.marketDetail

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market
import uk.co.coinwatch.services.favorite.FavoriteService

interface MarketDetailInteractor {
    @Throws(Throwable::class)
    suspend fun fetchMarket(id: String): Market
    fun toggleFavorite(id: String)
    fun isFavorite(id: String): Boolean
}

class DefaultMarketDetailInteractor(
    val coinGeckoService: CoinGeckoService,
    val favoriteService: FavoriteService
): MarketDetailInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchMarket(id: String): Market =
        withContext(Dispatchers.Default) {
            return@withContext coinGeckoService.market(listOf(id)).first()
        }

    override fun toggleFavorite(id: String) =
        favoriteService.setFavorite(id, !isFavorite(id))

    override fun isFavorite(id: String) =
        favoriteService.isFavorite(id)
}