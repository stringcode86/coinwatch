//
//  Numeric+extensions.swift
//  iosApp
//
//  Created by anon on 13/11/2024.
//  Copyright © 2024 orgName. All rights reserved.
//

extension Int {
    
    var int32: Int32 {
        guard self <= Int32.max else {
            fatalError("\(self) greater than Int32.max \(Int32.max)")
        }
        return Int32(self)
    }
}
