package uk.co.coinwatch.modules.trending

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.common.viewModels.from
import uk.co.coinwatch.modules.home.HomePresenterEvent
import uk.co.coinwatch.modules.home.HomeWireframeDestination
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class TrendingPresenterEvent {
    object Reload: TrendingPresenterEvent()
    data class Navigate(val markIdx: Int) : TrendingPresenterEvent()
}

interface TrendingPresenter {
    fun present()
    fun handle(event: TrendingPresenterEvent)
}

class DefaultTrendingPresenter(
    private val view: WeakRef<TrendingView>,
    private val interactor: TrendingInteractor,
    private val wireframe: TrendingWireframe,
): TrendingPresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
        updateView()
        bgScope.launch { handleNewMarkets(interactor.fetchTrending()) }
    }

    override fun handle(event: TrendingPresenterEvent) = when (event) {
        is TrendingPresenterEvent.Reload -> present()
        is TrendingPresenterEvent.Navigate -> handleNavigate(event)
    }

    private fun handleNavigate(event: TrendingPresenterEvent.Navigate) {
        val mrkt = markets[event.markIdx]
        wireframe.navigate(
            TrendingWireframeDestination.Market(mrkt.id, mrkt.image)
        )
    }

    private fun handleNewMarkets(newMarkets: List<Market>) = uiScope.launch {
        markets = newMarkets
        updateView()
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): TrendingViewModel =
        if (markets.isEmpty()) TrendingViewModel.Loading
        else TrendingViewModel.Loaded(markets.map { MarketViewModel.from(it)})
}