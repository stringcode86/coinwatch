package uk.co.coinwatch.modules.marketDetail

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.services.coinGecko.model.Market
import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.common.viewModels.from

sealed class MarketDetailPresenterEvent {
    object Reload: MarketDetailPresenterEvent()
    data class Search(val term: String?): MarketDetailPresenterEvent()
}

interface MarketDetailPresenter {
    fun present()
    fun handle(event: MarketDetailPresenterEvent)
}

class DefaultMarketDetailPresenter(
    private val view: WeakRef<MarketDetailView>,
    private val interactor: MarketDetailInteractor,
    private val context: MarketDetailWireframeContext,
    private val wireframe: MarketDetailWireframe,
): MarketDetailPresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
//        updateView()
        mockUpdateView()
        bgScope.launch {
            val newMarkets = interactor.fetchMarket()
            uiScope.launch {
                markets = newMarkets
//                updateView()
                mockUpdateView()
            }
        }
    }

    override fun handle(event: MarketDetailPresenterEvent) {
        println("[DefaultMarketPresenter] handle $event")
    }

    private fun mockUpdateView() =
        view.get()?.update(
            if (markets.isEmpty()) MarketDetailViewModel.Loading
            else MarketDetailViewModel.Loaded(
                MarketViewModel(context.id, context.id, context.imgUrl, null, null, null, null, null, null)
            )
        )

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): MarketDetailViewModel {
        return if (markets.isEmpty()) MarketDetailViewModel.Loading
        else MarketDetailViewModel.Loaded(MarketViewModel.from(markets[0]))
    }
}