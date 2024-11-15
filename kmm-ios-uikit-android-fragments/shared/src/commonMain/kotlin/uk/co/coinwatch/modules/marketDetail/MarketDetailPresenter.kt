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
    object ToggleFavorite: MarketDetailPresenterEvent()
    object NavigateHome: MarketDetailPresenterEvent()
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
    private var market: Market? = null

    override fun present() {
        updateView()
        bgScope.launch { handleNewMarket(interactor.fetchMarket(context.id)) }
    }

    override fun handle(event: MarketDetailPresenterEvent) = when (event) {
        is MarketDetailPresenterEvent.Reload -> present()
        is MarketDetailPresenterEvent.ToggleFavorite -> handleToggleFavorite()
        is MarketDetailPresenterEvent.NavigateHome -> handleNavigateHome()
    }

    private fun handleToggleFavorite() {
        interactor.toggleFavorite(context.id)
        updateView()
    }

    private fun handleNewMarket(newMarket: Market) = uiScope.launch {
        market = newMarket
        updateView()
    }

    private fun handleNavigateHome() =
        wireframe.navigate(MarketDetailWireframeDestination.Home)

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): MarketDetailViewModel =
        if (market == null) MarketDetailViewModel.Loading(context.imgUrl)
        else MarketDetailViewModel.Loaded.from(
            market!!,
            interactor.isFavorite(context.id)
        )
}
