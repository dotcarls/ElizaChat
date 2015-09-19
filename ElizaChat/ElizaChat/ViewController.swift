//
//  ViewController.swift
//  ElizaChat
//
//  Created by Tim Carlson on 9/17/15.
//  Copyright (c) 2015 I399. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

class ViewController: UIViewController {
    @IBOutlet var usernameInput:UITextField!
    @IBOutlet var startText:UILabel!
    @IBOutlet var connectButton:UIButton!
    @IBOutlet var chatScreen:UITextView!
    @IBOutlet var chatInput:UITextField!
    @IBOutlet var sendButton:UIButton!
    @IBOutlet var stateSwitch:UISwitch!
    @IBOutlet var stateLabel:UILabel!
    
    var theSocket: SocketIOClient
    var theClient:Client

    required init(coder aDecoder: NSCoder) {
        // By default, connect to silo
        theSocket = SocketIOClient(socketURL: "silo.cs.indiana.edu:14638")
        theClient = Client(socket: self.theSocket)
        
        super.init(coder: aDecoder)
    }
    
    @IBAction func recieveInitialSetup(sender: UIButton) {
        // Create the socket connection
        self.theSocket.connect()
        
        // Hide start screen elements
        usernameInput.hidden = true;
        startText.hidden = true;
        connectButton.hidden = true;
        stateSwitch.hidden = true;
        stateLabel.hidden = true;
        
        // Show chat screen elements
        chatScreen.hidden = false;
        chatInput.hidden = false;
        sendButton.hidden = false;
        
        // Store name
        self.theClient.setName(usernameInput.text)
    
        
        ////////////////////
        // Socket Methods //
        ////////////////////
        
        // Event: connected
        // Description: emitted by the server to single client when connection is made
        self.theSocket.on("connected") {data, ack in
            self.theSocket.emit("welcome", self.theClient.getName())
        }
        
        // Event: chat message
        // Description: emitted by server to all clients when server receives a chat message
        self.theSocket.on("chat message") {data, ack in
            let msg = data?[0] as? String
            self.chatScreen.text = self.chatScreen.text + "\n" + msg!
        }
    }
    
    // Button to send message to server
    @IBAction func sendMessage(sender: UIButton) {
        var message = chatInput.text;
        chatInput.text = "";
        if message != "" {
            self.theSocket.emit("chat message", message, theClient.getName())
        }
    }
    
    @IBAction func setHost(sender: UISwitch) {
        let state = stateSwitch.on
        
        if (state) {
            self.theSocket = SocketIOClient(socketURL: "silo.cs.indiana.edu:14638")
            self.theClient = Client(socket: self.theSocket)
        } else {
            self.theSocket = SocketIOClient(socketURL: "127.0.0.1:14638")
            self.theClient = Client(socket: self.theSocket)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

}

