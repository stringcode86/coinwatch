package uk.co.coinwatch.modules.home

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.common.viewModels.from
import uk.co.coinwatch.modules.marketDetail.MarketDetailPresenterEvent
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class HomePresenterEvent {
    object Reload: HomePresenterEvent()
    object LoadNextPage: HomePresenterEvent()
    data class Search(val term: String?): HomePresenterEvent()
    data class Navigate(val markIdx: Int): HomePresenterEvent()
}

interface HomePresenter {
    fun present()
    fun handle(event: HomePresenterEvent)
}

class DefaultHomePresenter(
    private val view: WeakRef<HomeView>,
    private val interactor: HomeInteractor,
    private val wireframe: HomeWireframe,
): HomePresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
        updateView()
        bgScope.launch {
            val newMarkets = interactor.fetchMarkets()
            uiScope.launch {
                markets = newMarkets
                updateView()
            }
        }
    }

    override fun handle(event: HomePresenterEvent) = when (event) {
        is HomePresenterEvent.Reload -> present()
        is HomePresenterEvent.LoadNextPage -> TODO("Load next page")
        is HomePresenterEvent.Search -> TODO("Search")
        is HomePresenterEvent.Navigate -> handleNavigate(event)
    }

    private fun handleNavigate(event: HomePresenterEvent.Navigate) {
        val market = markets[event.markIdx]
        wireframe.navigate(
            HomeWireframeDestination.Market(market.id, market.image)
        )
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): HomeViewModel {
        return if (markets.isEmpty()) HomeViewModel.Loading
        else HomeViewModel.Loaded(markets.map { MarketViewModel.from(it)})
    }
}