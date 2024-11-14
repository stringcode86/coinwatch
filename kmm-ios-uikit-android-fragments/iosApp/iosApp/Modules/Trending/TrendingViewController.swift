//
//  TrendingViewController.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class TrendingViewController: CardCollectionViewController, TrendingView {
    var presenter: TrendingPresenter!
    private var viewModel: TrendingViewModel = .Loading()
    private var cellSize: CGSize = .zero

    override func viewDidLoad() {
        super.viewDidLoad()
        presenter.present()
    }

    // MARK: - TrendingView

    func update(viewModel___ viewModel: TrendingViewModel) {
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
        presenter.handle(event___: .Navigate(markIdx: indexPath.item.int32))
    }
    
    // MARK: - Actions
    
    override func refreshAction(_ sender: Any) {
        presenter.handle(event___: .Reload())
    }
}
