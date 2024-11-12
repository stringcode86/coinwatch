package uk.co.coinwatch.modules.market

sealed class MarketWireframeDestination {
    object Home: MarketWireframeDestination()
}

interface MarketWireframe {
    fun present()
    fun navigate(destination: MarketWireframeDestination)
}