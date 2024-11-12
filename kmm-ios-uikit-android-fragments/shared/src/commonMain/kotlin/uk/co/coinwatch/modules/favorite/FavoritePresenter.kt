package uk.co.coinwatch.modules.favorite

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.modules.favorite.FavoriteInteractor
import uk.co.coinwatch.modules.favorite.FavoriteView
import uk.co.coinwatch.modules.favorite.FavoriteViewModel
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class FavoritePresenterEvent {
    object Reload: FavoritePresenterEvent()
    data class Search(val term: String?): FavoritePresenterEvent()
}

interface FavoritePresenter {
    fun present()
    fun handle(event: FavoritePresenterEvent)
}

class DefaultFavoritePresenter(
    private val view: WeakRef<FavoriteView>,
    private val interactor: FavoriteInteractor,
): FavoritePresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
        updateView()
        bgScope.launch {
            val newMarkets = interactor.fetchFavorite()
            uiScope.launch {
                markets = newMarkets
                updateView()
            }
        }
    }

    override fun handle(event: FavoritePresenterEvent) {
        println("[DefaultFavoritePresenter] handle $event")
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): FavoriteViewModel {
        return if (markets.isEmpty()) FavoriteViewModel.Loading
        else FavoriteViewModel.Loaded(
            markets.map {
                FavoriteViewModel.Loaded.Market(
                    it.id,
                    it.name,
                    it.image,
                    it.currentPrice.toString(), // TODO: Format
                    (it.priceChange24h ?: 0.0) > 0.0, // TODO: Format
                    it.priceChangePercentage24h.toString(), // TODO: Format
                    it.totalVolume.toString(), // TODO: Format
                    it.marketCap.toString(), // TODO: Format
                )
            }
        )
    }
}