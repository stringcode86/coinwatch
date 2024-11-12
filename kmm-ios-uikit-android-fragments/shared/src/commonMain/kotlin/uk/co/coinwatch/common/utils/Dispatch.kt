package uk.co.coinwatch.common.utils

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.time.Duration


fun execDelayed(
    delay: Duration,
    dispatcher: CoroutineDispatcher = Dispatchers.Main,
    block: ()->Unit
) {
    CoroutineScope(dispatcher).launch {
        delay(delay)
        block()
    }
}