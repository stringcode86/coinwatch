package uk.co.coinwatch.modules.marketDetail

sealed class MarketDetailWireframeDestination {
    object Home: MarketDetailWireframeDestination()
}

data class MarketDetailWireframeContext(
    val id: String,
    val imgUrl: String?
)

interface MarketDetailWireframe {
    fun present()
    fun navigate(destination: MarketDetailWireframeDestination)
}