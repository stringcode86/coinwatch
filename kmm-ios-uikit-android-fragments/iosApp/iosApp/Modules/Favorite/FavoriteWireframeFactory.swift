//
//  FavoriteWireframeFactory.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

protocol FavoriteWireframeFactory: AnyObject {
    func make(_ parent: UIViewController?) -> FavoriteWireframe
}

class DefaultFavoriteWireframeFactory: FavoriteWireframeFactory {
    private let marketDetailWireframeFactory: MarketDetailWireframeFactory
    private let coinGeckoService: CoinGeckoService
    private let favoriteService: FavoriteService
    
    init(
        marketDetailWireframeFactory: MarketDetailWireframeFactory,
        coinGeckoService: CoinGeckoService,
        favoriteService: FavoriteService
    ) {
        self.marketDetailWireframeFactory = marketDetailWireframeFactory
        self.coinGeckoService = coinGeckoService
        self.favoriteService = favoriteService
    }
    
    func make(_ parent: UIViewController?) -> FavoriteWireframe {
        return DefaultFavoriteWireframe(
            parent,
            marketDetailWireframeFactory: marketDetailWireframeFactory,
            coinGeckoService: coinGeckoService,
            favoriteService: favoriteService
        )
    }
}
