const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require ('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { id } = socket;
    const { error, user } = addUser({ id, name, room });

    if (error) return callback(error);

    socket.emit('message', { 
      user: 'admin',
      text: `${user.name} welcome to the room ${user.room}`,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined`
    });

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    } else {
      console.log('User does not found');
    }

  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} had left`,
      });
    }
    console.log('User had left');
  });
});

app.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
