const socket = io();

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const playerRadius = 10;

let players = {};

socket.on('update', (plys) => {
    players = plys;
    console.log(players);
    renderPlayers(); // Chamar renderPlayers após receber os dados atualizados
});

function renderPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const playerId in players) {
        const player = players[playerId];
        ctx.beginPath();
        ctx.arc(player.x, player.y, playerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.closePath();

        if (socket.id == playerId) {
            ctx.fillStyle = "red";
        ctx.font = "15px Arial";
        ctx.fillText("Eu", player.x, player.y);
        }
        
    }
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 37) {
        players[socket.id].x -= 10;
    } else if (e.keyCode == 39) {
        players[socket.id].x += 10;
    } else if (e.keyCode == 38) {
        players[socket.id].y -= 10;
    } else if (e.keyCode == 40) {
        players[socket.id].y += 10;
    }
    socket.emit('move', players[socket.id]);
});


// Iniciar o loop de renderização dos jogadores
setInterval(renderPlayers, 1000 / 60); // 60 FPS
