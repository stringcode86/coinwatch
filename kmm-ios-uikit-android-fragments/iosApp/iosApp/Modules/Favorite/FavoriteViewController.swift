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

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Favorite"
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
        return (viewModel as? FavoriteViewModel.Loaded)?.markets.count ?? 0
    }

    override func collectionView(
        _ collectionView: UICollectionView,
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        
        guard let vm = viewModel as? FavoriteViewModel.Loaded else {
            fatalError("[FavoriteViewController] unexpected viewModel \(viewModel)")
        }
        
        return collectionView.dequeue(MarketViewCell.self, for: indexPath)
            .update(vm.markets[indexPath.item])
    }
}
