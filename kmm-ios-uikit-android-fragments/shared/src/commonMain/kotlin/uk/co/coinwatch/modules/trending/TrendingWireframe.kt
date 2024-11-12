package uk.co.coinwatch.modules.trending

sealed class TrendingWireframeDestination {
    data class Market(
        val id: String,
        val imgUrl: String?
    ): TrendingWireframeDestination()
}

interface TrendingWireframe {
    fun present()
    fun navigate(destination: TrendingWireframeDestination)
}
