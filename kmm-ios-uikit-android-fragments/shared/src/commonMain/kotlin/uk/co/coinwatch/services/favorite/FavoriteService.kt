package uk.co.coinwatch.services.favorite

import com.russhwolf.settings.Settings
import com.russhwolf.settings.set

interface FavoriteService {
    fun isFavorite(id: String): Boolean
    fun setFavorite(id: String, favorite: Boolean)
    fun allFavorites(): List<String>
}

private val PREFIX = "coin_"

class DefaultFavoriteService: FavoriteService {

    private val settings: Settings = Settings()

    override fun isFavorite(id: String): Boolean {
        return settings.getBooleanOrNull(key(id)) ?: false
    }

    override fun setFavorite(id: String, favorite: Boolean) {
        settings.set(key(id), favorite)
    }

    override fun allFavorites(): List<String> =
        settings.keys.filter {
            if (it.subSequence(0, 5) != PREFIX) false
            else settings.getBooleanOrNull(it) ?: false
        }.map { it.substring(PREFIX.length) }

    private fun key(id:String): String =
        "$PREFIX$id"
}
