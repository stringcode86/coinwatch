//
//  MarketDetailViewController.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class MarketDetailViewController: UIViewController, MarketDetailView {
    
    var presenter: MarketDetailPresenter!

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = "Market"
        presenter.present()
    }
    
    func update(viewModel__ viewModel: MarketDetailViewModel) {
        print("[MarketDetailViewController] update(_ viewModel) \(viewModel)")
    }
}
