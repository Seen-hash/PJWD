## Realtime Anonymous Message Exchange for PJWD
 
A simple web application that allows internet users to exchange messages globally.
 
Incorporating a simple **HTML/CSS/JavaScript** front-end with **WebSockets**, and **Node.js**, **Express.js**, **WebSockets**, and **MongoDB**.
 
---
 
## Features

-  Send messages to all connected users instantly
-  Real-time messaging using WebSockets
-  Input your own username and see who sent each message
-  See the number of concurrently online users live
-  Messages are saved and loaded from MongoDB Atlas
-  Eye-friendly color palette
-  Toggle-able dark/light modes
 
---
 

 
## Structure
 
### PJWD/
##### public/ # Front-end files: index.html, style.css, script.js
#### models/ # Mongoose schema: Message.js 
#### .env # Hidden connection file for MongoDB 
#### server.js # Back-end using Node.js, Express.js, WebSockets & Mongoose
#### package.json 
#### README.md  
#### docs_phase3 # Folder with documentation and screencast video
 
---
 
## Technologies Roles
 
| Tech        | Role                           |
|-------------|--------------------------------|
| Node.js     | Runtime environment            |
| Express.js  | HTTP server + static file host |
| ws          | WebSocket server for real-time |
| MongoDB     | Message database (Atlas)       |
| Mongoose    | MongoDB ORM for schema/models  |
| HTML/CSS/JS | Frontend                       |

 
---
 

## Steps
 
### 1. Clone the repository
 
##### (bash/cmd)
git clone https://github.com/Seen-hash/PJWD.git
 
### 2. Install dependencies
 
##### (bash/cmd)
cd PJWD  
npm install
 
### 3. Set up your MongoDB URI
 
##### Create a .env file in the root directory (same level as server.js) and use the following syntax in it:
 
MONGO_URI=your_mongodb_connection_uri
 
You can get your URI from MongoDB Atlas/local
 
### 4. Start the server
 
##### (bash/cmd)
cd PJWD  
node server.js
 
### 5. Run the app
##### Open your browser(s) and visit:
http://localhost:3000
 
---
 
## This project is open source and available under the MIT License.
### Made with <3 by Yaseen.
