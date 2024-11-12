package uk.co.coinwatch.modules.trending

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.services.coinGecko.model.Market

sealed class TrendingPresenterEvent {
    object Reload: TrendingPresenterEvent()
}

interface TrendingPresenter {
    fun present()
    fun handle(event: TrendingPresenterEvent)
}

class DefaultTrendingPresenter(
    private val view: WeakRef<TrendingView>,
    private val interactor: TrendingInteractor,
): TrendingPresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var markets = emptyList<Market>()

    override fun present() {
        updateView()
        bgScope.launch {
            val newMarkets = interactor.fetchTrending()
            uiScope.launch {
                markets = newMarkets
                updateView()
            }
        }
    }

    override fun handle(event: TrendingPresenterEvent) {
        println("[DefaultTrendingPresenter] handle $event")
    }

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): TrendingViewModel {
        return if (markets.isEmpty()) TrendingViewModel.Loading
        else TrendingViewModel.Loaded(
            markets.map {
                TrendingViewModel.Loaded.Market(
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