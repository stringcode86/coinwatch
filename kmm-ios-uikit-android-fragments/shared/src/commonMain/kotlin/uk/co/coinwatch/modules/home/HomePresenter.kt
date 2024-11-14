package uk.co.coinwatch.modules.home

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.BufferOverflow.DROP_OLDEST
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import uk.co.coinwatch.common.utils.WeakRef
import uk.co.coinwatch.common.viewModels.MarketViewModel
import uk.co.coinwatch.common.viewModels.from
import uk.co.coinwatch.services.coinGecko.model.Market
import kotlin.time.Duration.Companion.seconds

private val SEARCH_DEBOUNCE_MS = 1.seconds

sealed class HomePresenterEvent {
    object Reload : HomePresenterEvent()
    object LoadNextPage : HomePresenterEvent()
    data class Search(val term: String?) : HomePresenterEvent()
    data class Navigate(val markIdx: Int) : HomePresenterEvent()
}

interface HomePresenter {
    fun present()
    fun handle(event: HomePresenterEvent)
}

class DefaultHomePresenter(
    private val view: WeakRef<HomeView>,
    private val interactor: HomeInteractor,
    private val wireframe: HomeWireframe,
) : HomePresenter {
    private val bgScope = CoroutineScope(Dispatchers.Default)
    private val uiScope = CoroutineScope(Dispatchers.Main)
    private var latestPage = 0
    private var isLoadingNextPage = false
    private var markets = emptyList<Market>()
    private var searchTerm: String? = null
    private var searchMarkets = emptyList<Market>()
    private val searchFlow = MutableSharedFlow<String?>(
        extraBufferCapacity = 1,
        onBufferOverflow = DROP_OLDEST
    )

    init {
        searchFlow
            .debounce(SEARCH_DEBOUNCE_MS)
            .flatMapLatest { term -> flow { emit(interactor.search(term)) } }
            .onEach { handleSearchResult(it) }
            .launchIn(bgScope)
    }

    override fun present() {
        latestPage = 0
        updateView(loadingViewModel())
        bgScope.launch { handleNewMarkets(interactor.fetchMarkets()) }
    }

    override fun handle(event: HomePresenterEvent) = when (event) {
        is HomePresenterEvent.Reload -> present()
        is HomePresenterEvent.LoadNextPage -> handleLoadNextPage()
        is HomePresenterEvent.Search -> handleSearch(event)
        is HomePresenterEvent.Navigate -> handleNavigate(event)
    }

    private fun handleNavigate(event: HomePresenterEvent.Navigate) {
        val mrkt = if (searchTerm.isNullOrEmpty()) markets[event.markIdx]
        else searchMarkets[event.markIdx]
        wireframe.navigate(HomeWireframeDestination.Market(mrkt.id, mrkt.image))
    }

    private fun handleSearch(event: HomePresenterEvent.Search) {
        searchTerm = event.term
        bgScope.launch { searchFlow.emit(event.term) }
    }

    private fun handleSearchResult(markets: List<Market>) = uiScope.launch {
        searchMarkets = markets
        updateView(loadedViewModel())
    }

    private fun handleLoadNextPage() {
        if (isLoadingNextPage) return
        isLoadingNextPage = true
        updateView(loadedViewModel())
        bgScope.launch {
            handleNextPageResult(interactor.fetchMarkets(latestPage + 1))
        }
    }

    private fun handleNextPageResult(newMarkets: List<Market>) = uiScope.launch {
        markets = markets + newMarkets
        latestPage += 1
        isLoadingNextPage = false
        updateView(loadedViewModel())
    }

    private fun handleNewMarkets(newMarkets: List<Market>) = uiScope.launch {
        markets = newMarkets
        updateView(loadedViewModel())
    }

    private fun updateView(viewModel: HomeViewModel) =
        view.get()?.update(viewModel)

    private fun loadedViewModel(): HomeViewModel = HomeViewModel.Loaded(
        if (searchTerm.isNullOrEmpty()) markets.map { MarketViewModel.from(it) }
        else searchMarkets.map { MarketViewModel.from(it) }
    )

    private fun loadingViewModel(): HomeViewModel = HomeViewModel.Loading(
        if (searchTerm.isNullOrEmpty()) markets.map { MarketViewModel.from(it) }
        else searchMarkets.map { MarketViewModel.from(it) }
    )
}
