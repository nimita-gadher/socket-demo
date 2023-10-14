const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('Socket connection successful :', socket.id);

  // Send a welcome message to the client
  socket.emit('message', 'Welcome to the socket connection!');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Periodically send a message to clients
setInterval(() => {
  const message = 'This is a periodic message!';
  io.emit('message', message);
}, 5000); // Sends the message every 5 seconds

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
