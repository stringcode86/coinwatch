package uk.co.coinwatch.modules.home

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.channels.BufferOverflow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
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
    private var markets = emptyList<Market>()
    private var searchTerm: String? = null
    private var searchMarkets = emptyList<Market>()
    private val searchFlow = MutableSharedFlow<String?>(
        extraBufferCapacity = 1,
        onBufferOverflow = BufferOverflow.DROP_OLDEST
    )

    init {
        searchFlow
            .debounce(SEARCH_DEBOUNCE_MS)
            .flatMapLatest { term -> flow { emit(interactor.search(term)) } }
            .onEach {
                uiScope.launch {
                    searchMarkets = it
                    updateView()
                }
            }
            .launchIn(bgScope)
    }


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

    private fun updateView() =
        view.get()?.update(viewModel())

    private fun viewModel(): HomeViewModel =
        if (markets.isEmpty()) HomeViewModel.Loading
        else HomeViewModel.Loaded(
            if (searchTerm.isNullOrEmpty()) markets.map { MarketViewModel.from(it) }
            else searchMarkets.map { MarketViewModel.from(it) }
        )
}
