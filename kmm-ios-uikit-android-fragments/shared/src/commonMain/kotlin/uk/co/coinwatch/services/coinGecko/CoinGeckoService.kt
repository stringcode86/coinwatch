package uk.co.coinwatch.services.coinGecko

import uk.co.coinwatch.services.coinGecko.model.Coin
import uk.co.coinwatch.services.coinGecko.model.Market
import io.ktor.client.HttpClient
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.plugins.logging.SIMPLE
import io.ktor.client.request.get
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.encodeURLParameter
import io.ktor.http.headers
import io.ktor.http.withCharset
import io.ktor.serialization.kotlinx.json.json
import io.ktor.utils.io.charsets.Charsets
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import uk.co.coinwatch.services.coinGecko.model.CoinsResult
import uk.co.coinwatch.services.coinGecko.model.TrendingResult
import uk.co.coinwatch.shared.BuildKonfig

/** Coin Gecko api service*/
interface CoinGeckoService {
    /**
     * @param ids - Currency ids (ethereum, bitcoin ... ) if `null` returns all
     * @param quote - The target currency of market data (usd, eur, jpy, etc.)
     * @param page - Starts from 1
     * @param change - 1h, 24h, 7d, 14d, 30d, 200d, 1y
     */
    @Throws(Throwable::class)
    suspend fun market(
        ids: List<String>? = null,
        quote: String = "usd",
        page: Int = 0,
        change: String = "24h"
    ): List<Market>
    /**
     * Search for coins
     * @param term - Search string
     */
    @Throws(Throwable::class)
    suspend fun search(term: String): List<Coin>
    /** Trending coins */
    @Throws(Throwable::class)
    suspend fun trending(): List<Coin>
}

class DefaultCoinGeckoService : CoinGeckoService {

    private val baseURL: String = "https://api.coingecko.com/api/v3"
    private val dispatcher: CoroutineDispatcher = Dispatchers.Default
    private val client: HttpClient = HttpClient() {
        Logging { level = LogLevel.NONE; logger = Logger.SIMPLE }
        install(ContentNegotiation) { json(geckoJson, contentType()) }
        headers { append("x-cg-demo-api-key", BuildKonfig.coinGeckoApiKey) }
    }

    @Throws(Throwable::class)
    override suspend fun market(
        ids: List<String>?,
        quote: String,
        page: Int,
        change: String
    ): List<Market> = withContext(dispatcher) {
        val idsStr = if (ids != null && ids.isNotEmpty()) {
            "&ids=" + ids.reduce { acc, s -> "$acc,$s" }.removeSuffix(",")
        } else ""

        val url = baseURL +
            "/coins/markets?vs_currency=$quote$idsStr&order=market_cap_desc" +
            "&per_page=50&page=$page&price_change_percentage=$change" +
            "&sparkline=true"
        val bodyStr = client.get(url).bodyAsText()
        return@withContext geckoJson.decodeFromString(bodyStr)
    }

    @Throws(Throwable::class)
    override suspend fun search(term: String): List<Coin> = withContext(dispatcher) {
        val url = baseURL + "/search?query=" + term.encodeURLParameter()
        val bodyStr = client.get(url).bodyAsText()
        val result = geckoJson.decodeFromString<CoinsResult>(bodyStr)
        return@withContext result.coins
    }

    @Throws(Throwable::class)
    override suspend fun trending(): List<Coin> = withContext(dispatcher) {
        val bodyStr = client.get(baseURL + "/search/trending").bodyAsText()
        val result = geckoJson.decodeFromString<TrendingResult>(bodyStr)
        return@withContext result.coins
            .map { it.get("item") }
            .filterNotNull()
    }

    private fun contentType(): ContentType {
        return ContentType.Application.Json.withCharset(Charsets.UTF_8)
    }
}

@OptIn(kotlinx.serialization.ExperimentalSerializationApi::class)
private val geckoJson = Json {
    encodeDefaults = true
    isLenient = true
    ignoreUnknownKeys = true
    coerceInputValues = true
    allowStructuredMapKeys = true
    useAlternativeNames = false
    prettyPrint = true
    useArrayPolymorphism = true
    explicitNulls = false
}