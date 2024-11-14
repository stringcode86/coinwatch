# Coin Watch

During the interview process there is often a task. Coin Watch is simple app that
is a good example of such task. Written in six different ways. App allows user to
view coins and various details about them. It allows user to bookmark coins. Uses
coin gecko API. Review the code


## One app built six different ways:

- **Web front end**. Next.js React version of CoinWatch app. Uses Tailwind, Tanstack Query, Zustand, React-rechart.
  Review code [react-js-web-app](./react-js-web-app). 


- **Mobile React Native (iOS, Android & Web)**. React Native Expo iOS and Android 
apps. And React Next.js front end app. Virtually all code is shared amongst all 
three platforms. Uses Tamagui UIKit, Tanstack Query, Zustand. Review code
[react-native-ios-android-web](./react-native-ios-android-web).


- **iOS UIKit (with KMM)**. Kotlin multi-platform version of the app. Share core library that contains all the
business logic written in Kotlin. Compiles native binary for each platform. Vends
view models to thin UI Layer written in Swift leveraging UIKit. UI layer sends events
to Core library. Apps use Viper architecture. Code so clean it bring tears of joy to Uncle Bob's eye. Review
code [kmm-ios-uikit-android-fragments](./kmm-ios-uikit-android-fragments).


- **iOS Swift UI**. Pure SwiftUI version of the app. Uses all the SwiftUI latest best practices. Review
code [ios-swift-ui](./ios-swift-ui).


- **Android View based (with KMM)** Kotlin multi-platform version of the app. Share core library that contains all the
business logic written in Kotlin. Compiles native binary for each platform. Vends
view models to thin UI Views layer, leveraging Fragment. UI layer sends events to
Core library. Apps use Viper architecture. Code so clean it bring tears of joy to Uncle Bob's eye. Review
code [kmm-ios-uikit-android-fragments](./kmm-ios-uikit-android-fragments).


- **Android Jetpack Compose**. Pure Jetpack Compose version of the app. Uses all the Jetpack Compose latest best 
practices. Review code [android-jectpack-compose](./android-jectpack-compose).


### NOTE
Currently under active development. Not all code push yet. Check back in a day or
two.
