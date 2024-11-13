//
//  CardCollectionViewController.swift
//  iosApp
//
//  Created by anon on 13/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import UIKit

class CardCollectionViewController: UICollectionViewController,
                                    UICollectionViewDelegateFlowLayout {
    private var cellSize: CGSize = .zero
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        invalidateCellSizeCache()
    }

    // MARK: - UICollecitonViewFlowDelegate
    
    func collectionView(
        _ collectionView: UICollectionView,
        layout collectionViewLayout: UICollectionViewLayout,
        sizeForItemAt indexPath: IndexPath
    ) -> CGSize {
        cellSize
    }
    
    private func invalidateCellSizeCache() {
        let layout = collectionView.flowLayout()
        let insets = layout?.sectionInset
        let inset = (insets?.left ?? 8) + (insets?.right ?? 8)
        let spacing = layout?.minimumInteritemSpacing ?? 16
        let lenght = floor((view.bounds.width - spacing - inset) / 2)
        cellSize = .init(width: lenght, height: lenght)
    }
}
