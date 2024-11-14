### Coin Watch

Kotlin multi-platform version of the app. Shared core library that contains all 
the business logic written in Kotlin. Compiles native binary for each platform. 
Vends view models to thin UI Layer written in Swift leveraging UIKit and Kotlin 
using Fragments. UI layer sends events to core library. Apps use Viper 
architecture. Code so clean it bring tears of joy to Uncle Bob's eye. 

- build config file `./gradlew generateBuildKonfig`


# TODO: 
- Shared prefs
- Favorites service
- MarketDetail page
- EvnVars lib
- Android
