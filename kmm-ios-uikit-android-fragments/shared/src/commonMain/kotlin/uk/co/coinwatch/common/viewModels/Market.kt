package uk.co.coinwatch.common.viewModels

data class Market(
    val id: String,
    val name: String,
    val imgUrl: String?,
    val price: String?,
    val up: Boolean?,
    val pctChange: String?,
    val volCap: String?,
    val mrkCap: String?,
)