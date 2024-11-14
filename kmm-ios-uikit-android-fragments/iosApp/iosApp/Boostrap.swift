//
//  Boostrap.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

// For sample code purposes setup is raw dogged. Dependency injection frame
// would be used in real project
func bootstrap(_ window: UIWindow?) {
    let coinGeckoService = DefaultCoinGeckoService()
    let favoriteService = DefaultFavoriteService()
    let marketDetailWireframeFactory = DefaultMarketDetailWireframeFactory(
        coinGeckoService: coinGeckoService
    )
    let homeViewWireframeFactory = DefaultHomeWireframeFactory(
        marketDetailWireframeFactory: marketDetailWireframeFactory,
        coinGeckoService: coinGeckoService
    )
    let favoriteViewWireframeFactory = DefaultFavoriteWireframeFactory(
        marketDetailWireframeFactory: marketDetailWireframeFactory,
        coinGeckoService: coinGeckoService,
        favoriteService: favoriteService
    )
    let trendingViewWireframeFactory = DefaultTrendingWireframeFactory(
        marketDetailWireframeFactory: marketDetailWireframeFactory,
        coinGeckoService: coinGeckoService
    )
    let rootWireframeFactory = DefaultRootWireframeFactory(
        homeWireframeFactory: homeViewWireframeFactory,
        favoriteWireframeFactory: favoriteViewWireframeFactory,
        trendingWireframeFactory: trendingViewWireframeFactory
    )
    
    rootWireframeFactory.make(window).present()
}
