package uk.co.coinwatch.modules.marketDetail

sealed class MarketDetailWireframeDestination {
    object Home: MarketDetailWireframeDestination()
}

interface MarketDetailWireframe {
    fun present()
    fun navigate(destination: MarketDetailWireframeDestination)
}