package uk.co.coinwatch.common.utils

expect class WeakRef<T : Any> {
    constructor(referred: T)
    fun clear()
    fun get(): T?
    val value: T?
}