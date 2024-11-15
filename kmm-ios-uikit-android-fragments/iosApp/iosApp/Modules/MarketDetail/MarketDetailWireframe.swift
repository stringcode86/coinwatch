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
    private let context: MarketDetailWireframeContext
    private let coinGeckoService: CoinGeckoService
    private let favoriteService: FavoriteService
    private weak var parent: UIViewController?
    private weak var vc: UIViewController?

    init(
        _ parent: UIViewController?,
        context: MarketDetailWireframeContext,
        coinGeckoService: CoinGeckoService,
        favoriteService: FavoriteService
    ) {
        self.parent = parent
        self.context = context
        self.coinGeckoService = coinGeckoService
        self.favoriteService = favoriteService
    }
    
    func present() {
        let vc = wireUp()
        parent?.show(vc, sender: self)
    }
    
    func navigate(destination__ destination: MarketDetailWireframeDestination) {
        vc?.navigationController?.popViewController(animated: true)
    }

    private func wireUp() -> UIViewController {
        let vc: MarketDetailViewController = UIStoryboard(.main).instantiate()
        let interactor = DefaultMarketDetailInteractor(
            coinGeckoService: coinGeckoService,
            favoriteService: favoriteService
        )
        let presenter = DefaultMarketDetailPresenter(
            view: WeakRef(referred: vc),
            interactor: interactor,
            context: context,
            wireframe: self
        )
        vc.presenter = presenter
        self.vc = vc
        return vc
    }
}
