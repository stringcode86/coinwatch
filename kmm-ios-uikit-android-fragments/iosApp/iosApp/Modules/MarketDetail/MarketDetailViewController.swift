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
    @IBOutlet weak var favoriteButton: UIBarButtonItem!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var chartView: ChartView!
    @IBOutlet weak var priceLabelA: UILabel!
    @IBOutlet weak var priceLabelB: UILabel!
    @IBOutlet weak var volumeLabelA: UILabel!
    @IBOutlet weak var volumeLabelB: UILabel!
    @IBOutlet weak var supplyLabelA: UILabel!
    @IBOutlet weak var supplyLabelB: UILabel!
    
    var presenter: MarketDetailPresenter!

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title = ""
        presenter.present()
    }
    
    func update(viewModel__ viewModel: MarketDetailViewModel) {
        guard let vm = viewModel as? MarketDetailViewModel.Loaded else {
            return
        }
        let isUp = vm.up?.boolValue ?? false
        let isFav = vm.isFavorite
        navigationItem.title = vm.name
        imageView.setImage(url: vm.imgUrl)
        chartView.yValues = vm.sparkLine?.map { Double(truncating: $0) }
        priceLabelA.text = vm.price
        priceLabelB.text = vm.pctChange
        volumeLabelA.text = vm.vol
        volumeLabelB.text = vm.rank != nil ? "\(vm.rank!)" : "-"
        supplyLabelA.text = vm.supply
        supplyLabelB.text = vm.circulatingSupply
        priceLabelB.textColor = isUp ? .systemGreen : .systemRed
        chartView.tintColor = priceLabelB.textColor
        favoriteButton.image = UIImage(systemName: isFav ? "star.fill" : "star")
    }
    
    // MARK: - Actions
    
    @IBAction func favoriteAction(_ sender: Any) {
        presenter.handle(event__: .ToggleFavorite())
    }
}
