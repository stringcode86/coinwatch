package uk.co.coinwatch.modules.favorite

sealed class FavoriteWireframeDestination {
    data class Market(
        val id: String,
        val imgUrl: String?
    ): FavoriteWireframeDestination()
}

interface FavoriteWireframe {
    fun present()
    fun navigate(destination: FavoriteWireframeDestination)
}