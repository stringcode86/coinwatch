//
//  HomeWireframeFactory.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

protocol HomeWireframeFactory: AnyObject {
    func make(_ parent: UIViewController?) -> HomeWireframe
}

class DefaultHomeWireframeFactory: HomeWireframeFactory {
    private let marketDetailWireframeFactory: MarketDetailWireframeFactory
    private let coinGeckoService: CoinGeckoService
    
    init(
        marketDetailWireframeFactory: MarketDetailWireframeFactory,
        coinGeckoService: CoinGeckoService
    ) {
        self.marketDetailWireframeFactory = marketDetailWireframeFactory
        self.coinGeckoService = coinGeckoService
    }
    
    func make(_ parent: UIViewController?) -> HomeWireframe {
        return DefaultHomeWireframe(
            parent,
            marketDetailWireframeFactory: marketDetailWireframeFactory,
            coinGeckoService: coinGeckoService
        )
    }
}
