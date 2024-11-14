package uk.co.coinwatch.modules.favorite

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.common.viewModels.from
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class FavoritePresenterEvent {
    object Reload: FavoritePresenterEvent()
    data class Navigate(val markIdx: Int): FavoritePresenterEvent()
}

interface FavoritePresenter {
    fun present()
    fun handle(event: FavoritePresenterEvent)
}

class DefaultFavoritePresenter(
    private val view: WeakRef<FavoriteView>,
    private val interactor: FavoriteInteractor,
    private val wireframe: FavoriteWireframe,
): FavoritePresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
        updateView()
        bgScope.launch { handleNewMarkets(interactor.fetchFavorite()) }
    }

    override fun handle(event: FavoritePresenterEvent) = when (event) {
        is FavoritePresenterEvent.Reload -> present()
        is FavoritePresenterEvent.Navigate -> handleNavigate(event)
    }

    private fun handleNavigate(event: FavoritePresenterEvent.Navigate) {
        val mrkt = markets[event.markIdx]
        wireframe.navigate(
            FavoriteWireframeDestination.Market(mrkt.id, mrkt.image)
        )
    }

    private fun handleNewMarkets(newMarkets: List<Market>) = uiScope.launch {
        markets = newMarkets
        updateView()
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): FavoriteViewModel =
        if (markets.isEmpty()) FavoriteViewModel.Loading
        else FavoriteViewModel.Loaded(markets.map { MarketViewModel.from(it)})
}
