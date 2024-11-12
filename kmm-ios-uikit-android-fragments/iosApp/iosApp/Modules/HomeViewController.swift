//
//  CoinsViewController.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//


import UIKit
import shared

class HomeViewController: UICollectionViewController, HomeView, UICollectionViewDelegateFlowLayout {
    lazy var presenter: HomePresenter! = DefaultHomePresenter(
        view: WeakRef(referred: self),
        interactor: DefaultHomeInteractor(service: DefaultCoinGeckoService())
    )
    private var viewModel: HomeViewModel = .Loading()
    private var cellSize: CGSize = .zero
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Coins"
        presenter.present()
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        invalidateCellSizeCache()
    }
    
    // MARK: - HomeView
    
    func update(viewModel_ viewModel: HomeViewModel) {
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
        case let vm as HomeViewModel.Loaded:
            return vm.markets.count
        default:
            return 0
        }
    }
    
    override func collectionView(
        _ collectionView: UICollectionView,
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        guard let vm = viewModel as? HomeViewModel.Loaded else {
            fatalError("[HomeViewController] unexpected viewModel \(viewModel)")
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
