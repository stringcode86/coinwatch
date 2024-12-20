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
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var pctLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var capLabel: UILabel!
    @IBOutlet weak var volLabel: UILabel!
    @IBOutlet weak var chartView: ChartView!
    @IBOutlet weak var priceLabel: UILabel!
    @IBOutlet weak var gradientView: GradientView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        configureUI()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        layer.shadowPath = UIBezierPath(roundedRect: bounds, cornerRadius: 16).cgPath
    }
    
    func update(
        isUp: Bool,
        imgUrlStr: String?,
        pct: String?,
        name: String,
        cap: String?,
        vol: String?,
        price: String?,
        chartYValues: Array<Double>?
    ) -> Self {
        imageView.setImage(url: imgUrlStr)
        pctLabel.text = pct
        nameLabel.text = name
        capLabel.text = cap
        volLabel.text = vol
        priceLabel.text = price
        pctLabel.textColor = isUp ? .systemGreen : .systemRed
        priceLabel.textColor = pctLabel.textColor
        chartView.tintColor = pctLabel.textColor
        chartView.yValues = chartYValues
        gradientView.colors = [
            pctLabel.textColor.withAlphaComponent(0.0),
            pctLabel.textColor.withAlphaComponent(0.25)
        ]
        return self
    }
    
    private func configureUI() {
        clipsToBounds = false
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowRadius = 8
        layer.shadowOffset = .zero
        layer.shadowOpacity = 0.2
        contentView.backgroundColor = UIColor(named: "CellBackground")
        contentView.layer.cornerRadius = 16
        contentView.clipsToBounds = true
    }
}

extension MarketViewCell {
    
    func update(_ viewModel: MarketViewModel) -> Self {
        return update(
            isUp: viewModel.up?.boolValue ?? false,
            imgUrlStr: viewModel.imgUrl,
            pct: viewModel.pctChange,
            name: viewModel.name,
            cap: viewModel.mrkCap,
            vol: viewModel.vol,
            price: viewModel.price,
            chartYValues: viewModel.sparkLine?.map { Double(truncating: $0) }
        )
    }
}
