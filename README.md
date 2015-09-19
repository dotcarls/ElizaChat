# ElizaChat


INFO-I399 Eliza Collaborative Chat


Uses socket.io to pass messages between iOS clients and a node.js backend running on either SILO or the local machine. 


Setup:


```bash
git clone https://github.com/dotcarls/ElizaChat.git ElizaChat
cd ElizaChat/ElizaChat/
open ElizaChat.xcworkspace
```


NOTE: Make sure to open the .xcworkspace, NOT the .xcodeproj file.


To run the server, you must have node and npm installed. Then:


```bash
cd server
npm install
node app.js
```


A monitoring page is available at the same address as the socket server. For example: http://silo.cs.indiana.edu:14638

Contact: dotcarls@indiana.edu


elizabot.js is from https://github.com/brandongmwong/elizabot-js which is based on www.masswerk.at/elizabot and http://en.wikipedia.org/wiki/ELIZA
