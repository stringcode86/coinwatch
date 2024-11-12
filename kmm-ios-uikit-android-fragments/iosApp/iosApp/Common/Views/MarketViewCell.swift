//
//  MarketViewCell.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit
import shared

class MarketViewCell: UICollectionViewCell {
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!
    
    var tmpBg: UIColor = .systemBackground
    
    override func layoutSubviews() {
        super.layoutSubviews()
        clipsToBounds = false
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOffset = .init(width: 1, height: 1)
        layer.shadowRadius = 8
        layer.shadowOpacity = 1
        layer.shadowPath = UIBezierPath(roundedRect: bounds, cornerRadius: 16).cgPath
        contentView.backgroundColor = .secondarySystemBackground
        contentView.layer.cornerRadius = 16
        contentView.clipsToBounds = true
    }
    
    func update(name: String, price: String?) -> Self {
        nameLabel.text = name
        priceLabel.text = price
        return self
    }
}

extension MarketViewCell {
    
    func update(_ viewModel: HomeViewModel.LoadedMarket) -> Self {
        return update(name: viewModel.name, price: viewModel.price)
    }
}
