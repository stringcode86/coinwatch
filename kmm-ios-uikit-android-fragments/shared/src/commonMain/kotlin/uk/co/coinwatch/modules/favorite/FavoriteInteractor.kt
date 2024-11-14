package uk.co.coinwatch.modules.favorite

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import uk.co.coinwatch.services.coinGecko.CoinGeckoService
import uk.co.coinwatch.services.coinGecko.model.Market
import uk.co.coinwatch.services.favorite.FavoriteService

interface FavoriteInteractor {
    @Throws(Throwable::class)
    suspend fun fetchFavorite(): List<Market>
}

class DefaultFavoriteInteractor(
    val coinGeckoService: CoinGeckoService,
    val favoriteService: FavoriteService,
): FavoriteInteractor {

    @Throws(Throwable::class)
    override suspend fun fetchFavorite(): List<Market> = withContext(Dispatchers.Default) {
        val favoriteIds = favoriteService.allFavorites()
        return@withContext if (favoriteIds.isEmpty()) emptyList()
        else coinGeckoService.market(favoriteIds)
    }
}