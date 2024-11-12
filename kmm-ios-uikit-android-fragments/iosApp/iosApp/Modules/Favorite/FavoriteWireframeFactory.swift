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
    
    init(
        marketDetailWireframeFactory: MarketDetailWireframeFactory,
        coinGeckoService: CoinGeckoService
    ) {
        self.marketDetailWireframeFactory = marketDetailWireframeFactory
        self.coinGeckoService = coinGeckoService
    }
    
    func make(_ parent: UIViewController?) -> FavoriteWireframe {
        return DefaultFavoriteWireframe(
            parent,
            marketDetailWireframeFactory: marketDetailWireframeFactory,
            coinGeckoService: coinGeckoService
        )
    }
}
