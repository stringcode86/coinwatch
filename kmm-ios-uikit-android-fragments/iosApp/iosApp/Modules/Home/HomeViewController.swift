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
    private var viewModel: HomeViewModel = .Loading(prev: [])
    private var searchController: UISearchController = .init()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configureSearchController()
        presenter.present()
    }
    
    // MARK: - HomeView
    
    func update(viewModel_ viewModel: HomeViewModel) {
        self.viewModel = viewModel
        self.collectionView.performBatchUpdates { [weak self] in
            self?.collectionView.reloadSections(IndexSet(integer: 0))
        }
        updateRefreshController(for: viewModel)
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
        presenter.handle(event_: .Navigate(markIdx: indexPath.item.int32))
    }
    
    // MARK: - UIScrollViewDelegate
    
    override func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let sv = scrollView
        if sv.contentOffset.y >= sv.contentSize.height - sv.bounds.height {
            presenter.handle(event_: .LoadNextPage())
        }
    }
    
    // MARK: - Actions
    
    @IBAction override func refreshAction(_ sender: Any) {
        presenter.handle(event_: .Reload())
    }

    // MARK: - Utils

    private func configureSearchController() {
        searchController.searchBar.placeholder = "Search coins"
        searchController.searchBar.searchBarStyle = .minimal
        searchController.searchResultsUpdater = self
        navigationItem.searchController = searchController
    }
    
    private func updateRefreshController(for viewModel: HomeViewModel) {
        let isRefreshing = collectionView.refreshControl?.isRefreshing ?? false
        
        if ((viewModel as? HomeViewModel.Loading) != nil) && !isRefreshing {
            collectionView.refreshControl?.beginRefreshing()
        }
        
        if ((viewModel as? HomeViewModel.Loaded) != nil) && isRefreshing {
            collectionView.refreshControl?.endRefreshing()
        }
    }
}

// MARK: - UISearchResultsUpdating

extension HomeViewController: UISearchResultsUpdating {
    
    func updateSearchResults(for searchController: UISearchController) {
        presenter.handle(event_: .Search(term: searchController.searchBar.text))
    }
}
