require('dotenv').config();

const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');
const { handleMessage, handleClose } = require('./utils');

const url = require('url');

// Step 1: Create an HTTP server to initiate the first handshake
// Step 2: Create a WebSocket server by passing the HTTP server object
const server = createServer();
const wsServer = new WebSocketServer({ server });

// A map of all the connected users
const CONNECTIONS = {};

// Step 3: Listen for the 'connection' event on the WebSocket server
wsServer.on('connection', (conn, request) => {
  const { query: { username } } = url.parse(request.url, true);
  
  console.log('\x1b[35m%s\x1b[0m', `[${new Date().toISOString()}] | ${username} connected! 🚀`);
  
  const uuid = uuidv4();

  CONNECTIONS[uuid] = {
    conn, // Store the connection object
    username, // Store the username
    state: {}, // Store any metadata or mutable state for that user
  };

  conn.on('message', message => handleMessage(message, uuid));
  conn.on('close', () => handleClose(uuid));
});

// Step 4: Start the HTTP server
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Web Sockets Server started on port: ${PORT}`);
});
