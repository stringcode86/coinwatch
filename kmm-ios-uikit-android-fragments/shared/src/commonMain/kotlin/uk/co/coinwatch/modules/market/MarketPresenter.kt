package uk.co.coinwatch.modules.market

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class MarketPresenterEvent {
    object Reload: MarketPresenterEvent()
    data class Search(val term: String?): MarketPresenterEvent()
}

interface MarketPresenter {
    fun present()
    fun handle(event: MarketPresenterEvent)
}

class DefaultMarketPresenter(
    private val view: WeakRef<MarketView>,
    private val interactor: MarketInteractor,
): MarketPresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
        updateView()
        bgScope.launch {
            val newMarkets = interactor.fetchMarket()
            uiScope.launch {
                markets = newMarkets
                updateView()
            }
        }
    }

    override fun handle(event: MarketPresenterEvent) {
        println("[DefaultMarketPresenter] handle $event")
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): MarketViewModel {
        return if (markets.isEmpty()) MarketViewModel.Loading
        else MarketViewModel.Loaded(
            markets.map {
                MarketViewModel.Loaded.Market(
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