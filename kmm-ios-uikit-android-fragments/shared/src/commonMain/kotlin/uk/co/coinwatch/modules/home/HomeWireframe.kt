package uk.co.coinwatch.modules.home

sealed class HomeWireframeDestination {
    data class Market(
        val id: String,
        val imgUrl: String?
    ): HomeWireframeDestination()
}

interface HomeWireframe {
    fun present()
    fun navigate(destination: HomeWireframeDestination)
}
