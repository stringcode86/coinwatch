package uk.co.coinwatch.common.utils

import kotlin.math.round
import kotlin.math.pow
import kotlin.math.roundToInt
import kotlin.math.log
import kotlin.math.abs
import kotlin.math.max

class Formatter {
    companion object {
        private val symbols = listOf("", "k", "mil", "bil", "tril", "quad", "quin")

        fun simpleNumToStr(
            value: Double?,
            decimals: Int = 2,
            prefix: String = "",
            suffix: String = "",
            blank: String = "-",
        ): String =
            if (value == null) blank else "$prefix${value.round(decimals)}$suffix"

        fun abbreviated(value: Double?, blank: String = "-"): String {
            if (value == null) return blank
            val tier = max(log(abs(value), 10.0) / 3, 0.0)
            if (tier == 0.0) return tier.toString()
            val suffix = symbols[tier.toInt()]
            val scale = 10.0.pow(tier.toInt() * 3)
            val scaled = value / scale
            return "${scaled.round(1)} $suffix"
        }

    }
}

fun Double.round(decimals: Int): Double {
    val factor = 10.0.pow(decimals)
    return (this * factor).roundToInt() / factor
}