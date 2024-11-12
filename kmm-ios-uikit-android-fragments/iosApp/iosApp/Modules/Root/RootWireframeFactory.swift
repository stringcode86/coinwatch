//
//  RootWireframeFactory.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

protocol RootWireframeFactory: AnyObject {
    func make(_ window: UIWindow?) -> RootWireframe
}

class DefaultRootWireframeFactory: RootWireframeFactory {
    private let homeWireframeFactory: HomeWireframeFactory
    private let favoriteWireframeFactory: FavoriteWireframeFactory
    private let trendingWireframeFactory: TrendingWireframeFactory

    init(
        homeWireframeFactory: HomeWireframeFactory,
        favoriteWireframeFactory: FavoriteWireframeFactory,
        trendingWireframeFactory: TrendingWireframeFactory
    ) {
        self.homeWireframeFactory = homeWireframeFactory
        self.favoriteWireframeFactory = favoriteWireframeFactory
        self.trendingWireframeFactory = trendingWireframeFactory
    }

    func make(_ window: UIWindow?) -> RootWireframe {
        return DefaultRootWireframe(
            window,
            homeWireframeFactory: homeWireframeFactory,
            favoriteWireframeFactory: favoriteWireframeFactory,
            trendingWireframeFactory: trendingWireframeFactory
        )
    }
}
