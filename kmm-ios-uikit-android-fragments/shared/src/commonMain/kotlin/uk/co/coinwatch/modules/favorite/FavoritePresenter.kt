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
    data class Search(val term: String?): FavoritePresenterEvent()
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
        else FavoriteViewModel.Loaded(markets.map { MarketViewModel.from(it)})
    }
}