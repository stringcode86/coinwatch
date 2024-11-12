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
    func make(_ parent: UIViewController?) -> MarketDetailWireframe
}

class DefaultMarketDetailWireframeFactory: MarketDetailWireframeFactory {
    
    private let coinGeckoService: CoinGeckoService
    
    init(coinGeckoService: CoinGeckoService) {
        self.coinGeckoService = coinGeckoService
    }
    
    func make(_ parent: UIViewController?) -> MarketDetailWireframe {
        return DefaultMarketDetailWireframe(
            parent,
            coinGeckoService: coinGeckoService
        )
    }
}
