const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let players = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static('public', {}));

io.on('connection', (socket) => {
  console.log('a user connected');

  // Adicionar um novo jogador
  players[socket.id] = {
    x: Math.random() * 400,
    y: Math.random() * 400,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Cor aleatória
  };
  io.emit('update', players);

  // Remover o jogador quando desconectado
  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete players[socket.id];
    io.emit('playerDisconnect', socket.id); // Usando um nome de evento personalizado
  });

  socket.on('move', (player) => {
    players[socket.id].x = player.x;
    players[socket.id].y = player.y;
    io.emit('update', players);
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
