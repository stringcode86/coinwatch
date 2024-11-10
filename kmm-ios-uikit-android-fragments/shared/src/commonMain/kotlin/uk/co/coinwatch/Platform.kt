package uk.co.coinwatch

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform