//
//  MarketDetailWireframe.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class DefaultMarketDetailWireframe: MarketDetailWireframe {
    private let coinGeckoService: CoinGeckoService
    private weak var parent: UIViewController?
    private weak var vc: UIViewController?

    init(
        _ parent: UIViewController?,
        coinGeckoService: CoinGeckoService
    ) {
        self.parent = parent
        self.coinGeckoService = coinGeckoService
    }
    
    func present() {
        let vc = wireUp()
        parent?.show(vc, sender: self)
    }
    
    func navigate(destination__ destination: MarketDetailWireframeDestination) {
        
    }

    private func wireUp() -> UIViewController {
        let vc: MarketDetailViewController = UIStoryboard(.main).instantiate()
        let interactor = DefaultMarketDetailInteractor(service: coinGeckoService)
        let presenter = DefaultMarketDetailPresenter(
            view: WeakRef(referred: vc),
            interactor: interactor,
            wireframe: self
        )
        vc.presenter = presenter
        self.vc = vc
        return vc
    }
}
