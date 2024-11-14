//
//  HomeViewController.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class HomeViewController: CardCollectionViewController, HomeView {
    var presenter: HomePresenter!
    private var viewModel: HomeViewModel = .Loading()
    private var searchController: UISearchController = .init()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureUI()
        configureSearchController()
        presenter.present()
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
        return (viewModel as? HomeViewModel.Loaded)?.markets.count ?? 0
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
    
    override func collectionView(
        _ collectionView: UICollectionView,
        didSelectItemAt indexPath: IndexPath
    ) {
        presenter.handle(event_: .Navigate(markIdx: indexPath.item.int32))
    }
    
    // MARK: - Utils

    private func configureUI() {
        navigationItem.title = "Coins"
    }

    private func configureSearchController() {
        searchController.searchBar.placeholder = "Search coins"
        searchController.searchBar.searchBarStyle = .minimal
        searchController.searchResultsUpdater = self
        navigationItem.searchController = searchController
    }
}

// MARK: - UISearchResultsUpdating

extension HomeViewController: UISearchResultsUpdating {
    
    func updateSearchResults(for searchController: UISearchController) {
        presenter.handle(event_: .Search(term: searchController.searchBar.text))
    }
}
