//
//  HomeWireframe.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class DefaultHomeWireframe: HomeWireframe {
    private let marketDetailWireframeFactory: MarketDetailWireframeFactory
    private let coinGeckoService: CoinGeckoService
    private weak var parent: UIViewController?
    private weak var vc: UIViewController?

    init(
        _ parent: UIViewController?,
        marketDetailWireframeFactory: MarketDetailWireframeFactory,
        coinGeckoService: CoinGeckoService
    ) {
        self.parent = parent
        self.marketDetailWireframeFactory = marketDetailWireframeFactory
        self.coinGeckoService = coinGeckoService
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
    
    func navigate(destination_ destination: HomeWireframeDestination) {
        if let dest = destination as? HomeWireframeDestination.Market {
            let context = MarketDetailWireframeContext(id: dest.id, imgUrl: dest.imgUrl)
            marketDetailWireframeFactory.make(vc, context: context).present()
        }
    }

    private func wireUp() -> UIViewController {
        let vc: HomeViewController = UIStoryboard(.main).instantiate()
        let interactor = DefaultHomeInteractor(service: coinGeckoService)
        let presenter = DefaultHomePresenter(
            view: WeakRef(referred: vc),
            interactor: interactor,
            wireframe: self
        )
        vc.presenter = presenter
        self.vc = vc
        return UINavigationController(rootViewController: vc)
    }
}
