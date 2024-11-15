//
//  FavoriteViewController.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class FavoriteViewController: CardCollectionViewController, FavoriteView {
    var presenter: FavoritePresenter!
    private var viewModel: FavoriteViewModel = .Loading()

    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        presenter.present()
    }

    // MARK: - FavoriteView

    func update(viewModel: FavoriteViewModel) {
        self.viewModel = viewModel
        self.collectionView.performBatchUpdates { [weak self] in
            self?.collectionView.reloadSections(IndexSet(integer: 0))
        }
    }

    // MARK: - UICollectionViewDataSource

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    override func collectionView(
        _ collectionView: UICollectionView,
        numberOfItemsInSection section: Int
    ) -> Int {
        return viewModel.markets().count
    }

    override func collectionView(
        _ collectionView: UICollectionView,
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        
        return collectionView.dequeue(MarketViewCell.self, for: indexPath)
            .update(viewModel.markets()[indexPath.item])
    }
    
    override func collectionView(
        _ collectionView: UICollectionView,
        didSelectItemAt indexPath: IndexPath
    ) {
        presenter.handle(event: .Navigate(markIdx: indexPath.item.int32))
    }
}
