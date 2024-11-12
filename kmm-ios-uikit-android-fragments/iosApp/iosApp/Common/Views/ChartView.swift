//
//  ChartView.swift
//  iosApp
//
//  Created by anon on 12/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit

class ChartView: UIView {
    
    var yValues: Array<Double>? = [] {
        didSet { setNeedsLayout() }
    }
    
    override var tintColor: UIColor! {
        didSet { shapeLayer().strokeColor = tintColor.cgColor }
    }
    
    override class var layerClass: Swift.AnyClass {
        return CAShapeLayer.self
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        backgroundColor = nil
        shapeLayer().lineWidth = 2
        shapeLayer().fillColor = nil
    }
        
    override func layoutSubviews() {
        super.layoutSubviews()
        
        guard let yValues = yValues, yValues.count > 0 else {
            return
        }
                
        let path = UIBezierPath()
        let (w, h) = (bounds.width, bounds.height)
        let (minVal, maxVal) = (yValues.min()!, yValues.max()!)
        
        let step = w / CGFloat(yValues.count)
        let delta = maxVal - minVal
        
        path.move(to: .init(x: 0, y: h))
        
        for (i, yValue) in yValues.enumerated() {
            let x = CGFloat(i) * step
            let y = h - (yValue - minVal) / delta * h
            path.addLine(to: .init(x: x, y: y))
        }
        
        shapeLayer().path = path.cgPath
    }
    
    private func shapeLayer() -> CAShapeLayer {
        return self.layer as! CAShapeLayer
    }
}
