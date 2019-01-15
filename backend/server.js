const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 8081;
const app = express();
const socketServer = http.createServer(app);
const io = socketIo(socketServer);
const phrases = ["Andy goes to the circus", "A rainy day on Mars", "$1M BBQ competition", "Flaming hot Cheetos!", "Wendy's or McDonalds?", "Jimmy NEEDS new shoes", "One man enters, two men leave"];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

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
    var clientSocket = null
    for (var id in clients){
      clientSocket = io.sockets.connected[id];
      clientSocket.random = Math.random();
      if (lastSocket==null || clientSocket.random > lastSocket.random){
        lastSocket = clientSocket;
      }
    }

    io.sockets.to(socket.room).emit('start game', lastSocket.id);
    var rand = phrases[Math.floor(Math.random() * phrases.length)];
    io.sockets.to(socket.room).emit('phrase', rand);
    console.log(rand);

    var turn = 0;
    for (var id in clients){
      var client = io.sockets.connected[id];
      io.to(client.id).emit('set turn', turn);
      turn++;
    }
  })

  socket.on('post story', (sentence,gameTurn) => {
    io.sockets.to(socket.room).emit('post story', sentence, gameTurn);
  });

  socket.on('vote', (option) => {
    io.sockets.to(socket.room).emit('vote', option);
  })

})

socketServer.listen(port, () => console.log(`Listening on port ${port}`));
