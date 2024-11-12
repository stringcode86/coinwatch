//
//  RootWireframe.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class DefaultRootWireframe: RootWireframe {
    private let homeWireframeFactory: HomeWireframeFactory
    private let favoriteWireframeFactory: FavoriteWireframeFactory
    private let trendingWireframeFactory: TrendingWireframeFactory
    private weak var window: UIWindow?
    private weak var vc: UIViewController?

    init(
        _ window: UIWindow?,
        homeWireframeFactory: HomeWireframeFactory,
        favoriteWireframeFactory: FavoriteWireframeFactory,
        trendingWireframeFactory: TrendingWireframeFactory
    ) {
        self.window = window
        self.homeWireframeFactory = homeWireframeFactory
        self.favoriteWireframeFactory = favoriteWireframeFactory
        self.trendingWireframeFactory = trendingWireframeFactory
    }
    
    func present() {
        let vc = wireUp()
        homeWireframeFactory.make(vc).present()
        favoriteWireframeFactory.make(vc).present()
        trendingWireframeFactory.make(vc).present()
        window?.rootViewController = vc
        window?.makeKeyAndVisible()
    }

    private func wireUp() -> UIViewController {
        let tabVc = UITabBarController()
        self.vc = tabVc
        return tabVc
    }
}
