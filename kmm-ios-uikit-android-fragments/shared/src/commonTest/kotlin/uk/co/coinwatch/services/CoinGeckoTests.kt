package uk.co.coinwatch.services

import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import uk.co.coinwatch.services.coinGecko.DefaultCoinGeckoService
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds
import kotlin.test.assertTrue

class CoinGeckoTests {

    @Test
    fun testCoinsList() = runBlocking {
        val service = DefaultCoinGeckoService()
        val result = service.market(listOf("bitcoin"))
        assertTrue(
            result.isNullOrEmpty(),
            "Empty markets"
        )
    }
}