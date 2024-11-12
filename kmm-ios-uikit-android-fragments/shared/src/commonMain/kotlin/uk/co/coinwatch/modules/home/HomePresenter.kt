package uk.co.coinwatch.modules.home

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.common.viewModels.from
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class HomePresenterEvent {
    object Reload: HomePresenterEvent()
    data class Search(val term: String?): HomePresenterEvent()
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

    override fun handle(event: HomePresenterEvent) {
        println("[DefaultHomePresenter] handle $event")
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): HomeViewModel {
        return if (markets.isEmpty()) HomeViewModel.Loading
        else HomeViewModel.Loaded(markets.map { MarketViewModel.from(it)})
    }
}