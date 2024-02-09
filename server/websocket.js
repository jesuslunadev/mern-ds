const WebSocket = require('ws');
const http = require('http');

/**
 * The `server` variable represents an instance of the HTTP server created with `http.createServer()`.
 * It is used to handle HTTP requests received by the server.
 *
 * @type {http.Server}
 */
const server = http.createServer();

/**
 * Represents a WebSocket server.
 *
 * @class
 * @constructor
 * @param {Object} server - The server instance to use for WebSocket communication.
 */
const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });
  ws.send('Hello! Message from server');
});

module.exports = { wss, wsServer: server };