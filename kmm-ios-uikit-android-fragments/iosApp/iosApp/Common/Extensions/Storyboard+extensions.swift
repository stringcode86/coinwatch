//
//  Storyboard+extensions.swift
//  iosApp
//
//  Created by anon on 05/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

import Foundation

import UIKit

extension UIStoryboard {

    convenience init(_ id: Id, bundle: Bundle? = nil) {
        self.init(name: id.rawValue, bundle: bundle)
    }

    func instantiate<T: UIViewController>() -> T {
        let id = "\(T.self)"
        if let vc = instantiateViewController(withIdentifier: id) as? T {
            return vc
        }
        fatalError("Failed to instantiate \(id)")
    }
}

// MARK: - Ids

extension UIStoryboard {

    enum Id: String {
        case main = "Main"
    }
}
