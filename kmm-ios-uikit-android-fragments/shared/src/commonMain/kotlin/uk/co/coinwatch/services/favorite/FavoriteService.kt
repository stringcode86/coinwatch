package uk.co.coinwatch.services.favorite

import com.russhwolf.settings.Settings
import com.russhwolf.settings.set

interface FavoriteService {
    fun isFavorite(id: String): Boolean
    fun setFavorite(id: String, favorite: Boolean)
    fun allFavorites(): List<String>
}

class DefaultFavoriteService: FavoriteService {

    private val settings: Settings = Settings()

    override fun isFavorite(id: String): Boolean =
        settings.getBooleanOrNull(id) ?: false

    override fun setFavorite(id: String, favorite: Boolean) =
        settings.set(id, favorite)

    override fun allFavorites(): List<String> =
        settings.keys.filter { settings.getBooleanOrNull(it) ?: false }
}
