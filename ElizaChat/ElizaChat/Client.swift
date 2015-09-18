//
//  Chat.swift
//  ElizaChat
//
//  Created by Tim Carlson on 9/17/15.
//  Copyright (c) 2015 I399. All rights reserved.
//

import Foundation
import Socket_IO_Client_Swift

class Client {
    var name:String
    var socket:SocketIOClient
    
    init(socket:SocketIOClient) {
        self.name = ""
        self.socket = socket
    }
    
    func setName(name:String) {
        self.name = name;
    }
    
    func getName() -> String {
        return self.name;
    }
}