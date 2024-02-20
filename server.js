// const express = require('express');
// const axios = require('axios');
// const querystring = require('querystring');
// const crypto = require('crypto');

// const app = express();
// const port = 3000;

// // Replace these values with your OAuth provider's information
// const clientId = '248795944521-s77tc3d17eqk79fcu709im5dm3lfbic7.apps.googleusercontent.com';
// const clientSecret = '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 ';
// const redirectUri = 'http://localhost:3000/oauth/callback';
// const authorizationEndpoint = 'https://accounts.google.com/o/oauth2/auth';
// const tokenEndpoint = 'https://oauth2.googleapis.com/token';

// const scope = 'https://www.googleapis.com/auth/firebase';
// let storedState;
// // const tokenEndpoint = 'token_endpoint';

// // State to store the authorization code temporarily (not suitable for production)
// let authorizationCode;

// // Initiate the OAuth flow
// app.get('/api/oauth/initiate', (req, res) => {

//  state = crypto.randomBytes(16).toString('hex');

//   const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
//   res.json({ authUrl });
//   storedState = state;
// });

// // Handle the callback after user grants permission
// app.get('/oauth/callback', (req, res) => {
//   authorizationCode = req.query.code;

//   res.send('Authorization code received. You can close this tab now.');
// });

// // Exchange the authorization code for an access token
// app.post('/api/oauth/exchange', async (req, res) => {
//   try {
//     const tokenResponse = await axios.post(tokenEndpoint, querystring.stringify({
//       code: "4%2F0AfJohXl7eAVz2A8Zm8yGeo9n3L-lQ47kxXsRbcuTV_mN0wxJgoLtENHS5nfAtO7nBYvkwQ",
//       client_id: clientId,
//       client_secret: clientSecret,
//       redirect_uri: redirectUri,
//       grant_type: 'authorization_code',
//     }), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     res.json(tokenResponse.data);
//   } catch (error) {
//     res.status(error.response ? error.response.status : 500).json({ error: error.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// backend.js
// const WebSocket = require('ws');
// const Y = require('yjs');
// require('y-websocket');

// Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });
// const WebSocket = require('ws');

// // Define the port on which the WebSocket server will listen
// const PORT = 8080;

// // Create a WebSocket server instance
// const wss = new WebSocket.Server({ port: PORT });

// // Map to store connected clients by room
// const roomClients = new Map();

// // Event listener for WebSocket connections
// wss.on('connection', function connection(ws, req) {
//   // Extract room from query parameters or use a default room
//   const urlParams = new URLSearchParams(req.url.slice(1));
//   const room = urlParams.get('room') || 'default';

//   // Add client to room
//   if (!roomClients.has(room)) {
//     roomClients.set(room, new Set());
//   }
//   roomClients.get(room).add(ws);

//   console.log(`Client connected to room ${room}`);

//   // Event listener for messages from clients
//   ws.on('message', function incoming(message) {
//     console.log(`Received message from client in room ${room}: ${message}`);

//     // Broadcast the message to all clients in the same room
//     roomClients.get(room).forEach(function each(client) {
//       // if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message, { binary: false })
//       // }
//     });
//   });

//   // Event listener for WebSocket disconnections
//   ws.on('close', function close() {
//     // Remove client from room
//     if (roomClients.has(room)) {
//       roomClients.get(room).delete(ws);
//     }
//     console.log(`Client disconnected from room ${room}`);
//   });
// });

// // Log server start
// console.log(`WebSocket server is listening on port ${PORT}`);

// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const { Doc } = require('yjs');
// const { WebsocketProvider } = require('y-websocket');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on('connection', function connection(ws) {
//   const doc = new Doc();
//   const wsProvider = new WebsocketProvider(doc, ws, { awareness: null });

//   ws.on('close', () => {
//     wsProvider.destroy();
//     doc.destroy();
//   });
// });

// server.listen(8080, function () {
//   console.log('WebSocket server is listening on port 8080');
// });

// #!/usr/bin/env node

/**
 * @type {any}
 */
const WebSocket = require("ws");
// const https = require("https");
const http = require("http");
const wss = new WebSocket.Server({ noServer: true });
const setupWSConnection = require("./utils.js").setupWSConnection;

// const host = process.env.HOST || "localhost";
const port = process.env.PORT ||10000;

const host = "0.0.0.0";
// const host = "yjs-node.onrender.com"
// const port = 9595;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

// const server = https.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("okay");
// });

wss.on("connection", setupWSConnection);
// wss.on("connection", () => {
//   console.log("connection Started")
//   setupWSConnection();
// });

wss.on("message", (message) => {
  console.log("Received message:", message);
});

server.on("upgrade", (request, socket, head) => {
  // You may check auth of request here..
  // See https://github.com/websockets/ws#client-authentication
  /**
   * @param {any} ws
   */
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`);
});
