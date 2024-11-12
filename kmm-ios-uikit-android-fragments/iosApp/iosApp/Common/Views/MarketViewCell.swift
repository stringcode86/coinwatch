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
    
    override func awakeFromNib() {
        super.awakeFromNib()
        configureUI()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.shadowPath = UIBezierPath(roundedRect: bounds, cornerRadius: 16).cgPath
    }
    
    func update(name: String, price: String?) -> Self {
        nameLabel.text = name
        priceLabel.text = price
        return self
    }
    
    private func configureUI() {
        clipsToBounds = false
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowRadius = 8
        layer.shadowOffset = .zero
        layer.shadowOpacity = 0.25
        contentView.backgroundColor = .secondarySystemBackground
        contentView.layer.cornerRadius = 16
        contentView.clipsToBounds = true
    }
}

extension MarketViewCell {
    
    func update(_ viewModel: MarketViewModel) -> Self {
        return update(name: viewModel.name, price: viewModel.price)
    }
}
