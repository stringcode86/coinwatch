//
//  FavoriteViewController.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class FavoriteViewController: UICollectionViewController, FavoriteView, UICollectionViewDelegateFlowLayout {
    var presenter: FavoritePresenter!
    private var viewModel: FavoriteViewModel = .Loading()
    private var cellSize: CGSize = .zero

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Favorite"
        presenter.present()
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        invalidateCellSizeCache()
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
        switch viewModel {
        case let vm as FavoriteViewModel.Loaded:
            return vm.markets.count
        default:
            return 0
        }
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


    // MARK: - UICollecitonViewFlowDelegate

    func collectionView(
            _ collectionView: UICollectionView,
            layout collectionViewLayout: UICollectionViewLayout,
            sizeForItemAt indexPath: IndexPath
    ) -> CGSize {
        cellSize
    }

    // MARK: - Utils

    private func invalidateCellSizeCache() {
        let layout = collectionView.collectionViewLayout as? UICollectionViewFlowLayout
        let spacing = layout?.minimumInteritemSpacing ?? 16
        let lenght = floor((view.bounds.width - spacing) / 2)
        cellSize = .init(width: lenght, height: lenght)
    }
}
