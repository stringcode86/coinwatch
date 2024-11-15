### Coin Watch

Kotlin multi-platform version of the app. Shared core library that contains all 
the business logic written in Kotlin. Compiles native binary for each platform. 
Vends view models to thin UI Layer written in Swift leveraging UIKit and Kotlin 
using Fragments. UI layer sends events to core library. Apps use Viper 
architecture. Code so clean it bring tears of joy to Uncle Bob's eye. 

### Compile
- create `local.properties` in project root folder with coin gecko api key 
`uk.co.coinwatch.coinGeckoApiKey=${CONG_GECKO_API_KEY}`
- open in Android Studio sync all the dependencies
- generate build config file `./gradlew generateBuildKonfig`
- run iOS or Android app config from Android Studio
- run `./gradlew tasks` to list all available tasks