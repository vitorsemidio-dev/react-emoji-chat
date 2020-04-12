const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  
  socket.on('join', ({ name, room }) => {
    console.log(`${name} has joined the ${room} room`);
  }); 

  socket.on('disconnect', () => {
    console.log('User had left');
  })
});

app.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
