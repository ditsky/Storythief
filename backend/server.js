const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 8081;
const app = express();
const socketServer = http.createServer(app);
const io = socketIo(socketServer);

io.on('connection', socket => {
  console.log('New Client Conectected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('join', function(room,user){
    socket.join(room);
    socket.room = room;
    socket.user = user;
    var clients =  io.sockets.adapter.rooms[room].sockets;
    var string = ""
    for (var id in clients){
      var clientSocket = io.sockets.connected[id];
      string+=clientSocket.user + ", ";
    }
    console.log(string)
    io.sockets.to(socket.room).emit('new player',string);
  });

  socket.on('start game', function(){
    var clients =  io.sockets.adapter.rooms[socket.room].sockets;
    var lastSocket = null;
    for (var id in clients){
      var clientSocket = io.sockets.connected[id];
      clientSocket.random = Math.random();
      if (lastSocket==null || clientSocket.random > lastSocket.random){
        lastSocket = clientSocket;
      }
    }

    io.sockets.to(socket.room).emit('start game', lastSocket.id);
  })

  socket.on('post story', sentence => {
    io.sockets.to(socket.room).emit('post story', sentence);
  });

})

socketServer.listen(port, () => console.log(`Listening on port ${port}`));
