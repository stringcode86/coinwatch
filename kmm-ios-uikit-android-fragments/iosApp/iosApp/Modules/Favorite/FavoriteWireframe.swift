//
//  FavoriteWireframe.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class DefaultFavoriteWireframe: FavoriteWireframe {
    private let marketDetailWireframeFactory: MarketDetailWireframeFactory
    private let coinGeckoService: CoinGeckoService
    private let favoriteService: FavoriteService
    private weak var parent: UIViewController?
    private weak var vc: UIViewController?

    init(
        _ parent: UIViewController?,
        marketDetailWireframeFactory: MarketDetailWireframeFactory,
        coinGeckoService: CoinGeckoService,
        favoriteService: FavoriteService

    ) {
        self.parent = parent
        self.marketDetailWireframeFactory = marketDetailWireframeFactory
        self.coinGeckoService = coinGeckoService
        self.favoriteService = favoriteService
    }

    func present() {
        let vc = wireUp()
        if let tabVc = parent as? UITabBarController {
            let vcs = (tabVc.viewControllers ?? []) + [vc]
            tabVc.setViewControllers(vcs, animated: false)
        } else {
            parent?.show(vc, sender: self)
        }
    }

    func navigate(destination: FavoriteWireframeDestination) {
        if let dest = destination as? FavoriteWireframeDestination.Market {
            let context = MarketDetailWireframeContext(id: dest.id, imgUrl: dest.imgUrl)
            marketDetailWireframeFactory.make(vc, context: context).present()
        }
    }

    private func wireUp() -> UIViewController {
        let vc: FavoriteViewController = UIStoryboard(.main).instantiate()
        let interactor = DefaultFavoriteInteractor(
            coinGeckoService: coinGeckoService,
            favoriteService: favoriteService
        )
        let presenter = DefaultFavoritePresenter(
            view: WeakRef(referred: vc),
            interactor: interactor,
            wireframe: self
        )
        vc.presenter = presenter
        self.vc = vc
        return UINavigationController(rootViewController: vc)
    }
}
