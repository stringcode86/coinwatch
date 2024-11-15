//
//  MarketDetailWireframeFactory.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

protocol MarketDetailWireframeFactory: AnyObject {
    func make(
        _ parent: UIViewController?,
        context: MarketDetailWireframeContext
    ) -> MarketDetailWireframe
}

class DefaultMarketDetailWireframeFactory: MarketDetailWireframeFactory {
    
    private let coinGeckoService: CoinGeckoService
    private let favoriteService: FavoriteService
    
    init(
        coinGeckoService: CoinGeckoService,
        favoriteService: FavoriteService
    ) {
        self.coinGeckoService = coinGeckoService
        self.favoriteService = favoriteService
    }
    
    func make(
        _ parent: UIViewController?,
        context: MarketDetailWireframeContext
    ) -> MarketDetailWireframe {
        return DefaultMarketDetailWireframe(
            parent,
            context: context,
            coinGeckoService: coinGeckoService,
            favoriteService: favoriteService
        )
    }
}
