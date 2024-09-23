// reference to element 'canvas'
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// variables
const LIMIT = 7;
const BLOCK_SIZE = 32;
const RADIUS = 14;
let score = 0;

// keyboard
let keys = {}

// size of the maze
canvas.width = BLOCK_SIZE * 19;
canvas.height = BLOCK_SIZE * 21;


// build the maze
const maze = {
    cells: [
        // 0: not wall
        // 1: wall
        // 2: exit-ghost
        // 3: pacman
        // 4: small point
        // 5: big point
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        [1, 5, 1, 1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1, 1, 5, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        [1, 4, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 4, 1],
        [1, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 4, 1],
        [1, 1, 1, 1, 4, 1, 1, 1, 0, 1, 0, 1, 1, 1, 4, 1, 1, 1, 1],
        [0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0],
        [1, 1, 1, 1, 4, 1, 0, 1, 1, 2, 1, 1, 0, 1, 4, 1, 1, 1, 1],
        [0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], // half map
        [1, 1, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 1, 1],
        [0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0],
        [1, 1, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 1, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        [1, 4, 1, 1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1, 1, 4, 1],
        [1, 5, 4, 1, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 1, 4, 5, 1],
        [1, 1, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 1, 1],
        [1, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 4, 1],
        [1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1],
        [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    draw: function () {
        const block = {
            width: BLOCK_SIZE,
            height: BLOCK_SIZE,
            color: 'blue'
        }
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                ctx.beginPath();
                if (this.cells[i][j] === 1) {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(j * block.width, i * block.height, block.width, block.height);
                } else if (this.cells[i][j] === 2) {
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(j * block.width, i * block.height, block.width, block.height);
                } else if (this.cells[i][j] === 4) {
                    ctx.fillStyle = 'white';
                    ctx.arc(j * block.width + block.width / 2, i * block.height + block.height / 2, 4, 0, Math.PI * 2);
                }
                else if (this.cells[i][j] === 5) {
                    ctx.fillStyle = 'white';
                    ctx.arc(j * block.width + block.width / 2, i * block.height + block.height / 2, 10, 0, Math.PI * 2);
                }
                ctx.fill();
            }
        }
    }
};

// pacman
let pacman = {
    x: BLOCK_SIZE * 9 + RADIUS / 8,
    y: BLOCK_SIZE * 15 + RADIUS / 8,
    xHitBox: BLOCK_SIZE * 9 + 1,
    yHitBox: BLOCK_SIZE * 15 + 1,
    counter: 0,
    color: 'yellow',
    radius: RADIUS,
    speed: BLOCK_SIZE / LIMIT,
    mouthDir: 2, // 1 - left, 2 - right, 3 - up, 4 - down
    draw: function () {
        // this.drawHitBox();
        if (this.counter % 20 < 12) {
            this.openMouth();
        } else {
            this.closedMouth();
        }
        this.counter++;
    },
    drawHitBox: function () {
        ctx.beginPath();
        ctx.rect(this.xHitBox, this.yHitBox, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
        ctx.strokeStyle = 'green';
        ctx.stroke();
    },
    closedMouth: function () {
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    openMouth: function () {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y + this.radius);

        switch (this.mouthDir) {
            case 1: // left
                ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, Math.PI * 1.25, Math.PI * 0.75, false);
                break;
            case 2: // right
                ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, Math.PI * 0.25, Math.PI * 1.75, false);
                break;
            case 3: // up
                ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, Math.PI * 1.25, Math.PI * 1.75, true);
                break;
            case 4: // down
                ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, Math.PI * 0.25, Math.PI * 0.75, true);
                break;
        }

        ctx.lineTo(this.x + this.radius, this.y + this.radius);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};


// ghost
class Ghost {
    constructor(x, y, color) {
        this.x = x + RADIUS / 8;
        this.y = y + RADIUS / 8;
        this.xHitBox = x;
        this.yHitBox = y;
        this.radius = RADIUS;
        this.color = color;
        this.speed = 2;
        this.isMoving = false;
        this.endMove = true;
        this.direction = 3;
        this.stop = false;
        this.paths = [];
        this.intersections = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    foundNewPath() {
        const WALL = 1;
        let x = Math.floor(this.xHitBox / BLOCK_SIZE);
        let y = Math.floor(this.yHitBox / BLOCK_SIZE);

        // console.log("found new --------------------------------")
        // console.log(`pos: ${maze.cells[y][x]}`);
        // console.log(`cima: ${maze.cells[y - 1][x]}`);
        // console.log(`baixo: ${maze.cells[y + 1][x]}`);
        // console.log(`esquerda: ${maze.cells[y][x - 1]}`);
        // console.log(`direita: ${maze.cells[y][x + 1]}`);

        return (
            maze.cells[y][x + 1] != WALL ||
            maze.cells[y][x - 1] != WALL ||
            maze.cells[y + 1][x] != WALL ||
            maze.cells[y - 1][x] != WALL
        )
    }

    drawHitBox(color) {
        ctx.beginPath();
        ctx.rect(this.xHitBox, this.yHitBox, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fillStyle = color;
        ctx.fill();
    }

    isAlignedBox() {
        let x = this.xHitBox;
        let y = this.yHitBox;

        return x % BLOCK_SIZE == 0 && y % BLOCK_SIZE == 0;
    }

    getPaths() {
        const WALL = 1;
        let x = Math.floor(this.xHitBox / BLOCK_SIZE);
        let y = Math.floor(this.yHitBox / BLOCK_SIZE);
        let paths = [];

        if (maze.cells[y][x + 1] != WALL) {
            paths.push(2); // direita
        }
        if (maze.cells[y][x - 1] != WALL) {
            paths.push(1); // esquerda
        }
        if (maze.cells[y + 1][x] != WALL) {
            paths.push(4); // baixo
        }
        if (maze.cells[y - 1][x] != WALL) {
            paths.push(3); // cima
        }

        if (paths.length < 1)
            return [this.direction];
        return paths;
    }

    move() {
        if (!this.stop) {
            if (this.endMove) {
                this.paths = this.getPaths(); // Checa as direções possíveis
                // se a ultima posicao estiver na lista, retira, se nao tiver caminhos, colocar o oposto
                // se for 1, 2
                // se for 3, 4
                const AGAINST = {
                    1: 2,
                    2: 1,
                    3: 4,
                    4: 3
                }
                this.paths = this.paths.filter(path => path != AGAINST[this.direction]);
                this.direction = this.paths[Math.floor(Math.random() * this.paths.length)]; // Escolhe uma nova direção aleatória
                log(this.paths);
                this.endMove = false;
            }

            // 1 - esquerda, 2 - direita, 3 - cima, 4 - baixo
            switch (this.direction) {
                case 1: // esquerda
                    if (!positionIsWall(this.xHitBox - this.speed, this.yHitBox)) {
                        this.x -= this.speed;
                        this.xHitBox -= this.speed;
                        this.isMoving = true;
                    } else {
                        this.endMove = true; // Bateu na parede, recalcula direção
                    }
                    break;
                case 2: // direita
                    if (!positionIsWall(this.xHitBox + this.speed, this.yHitBox)) {
                        this.x += this.speed;
                        this.xHitBox += this.speed;
                        this.isMoving = true;
                    } else {
                        this.endMove = true;
                    }
                    break;
                case 3: // cima
                    if (!positionIsWall(this.xHitBox, this.yHitBox - this.speed)) {
                        this.y -= this.speed;
                        this.yHitBox -= this.speed;
                        this.isMoving = true;
                    } else {
                        this.endMove = true;
                    }
                    break;
                case 4: // baixo
                    if (!positionIsWall(this.xHitBox, this.yHitBox + this.speed)) {
                        this.y += this.speed;
                        this.yHitBox += this.speed;
                        this.isMoving = true;
                    } else {
                        this.endMove = true;
                    }
                    break;
            }
        }

        // Checa se o fantasma está alinhado em um bloco
        if (this.isAlignedBox()) {
            const WALL = 1;
            let x = Math.floor(this.xHitBox / BLOCK_SIZE);
            let y = Math.floor(this.yHitBox / BLOCK_SIZE);

            const LEFT = maze.cells[y][x - 1];
            const RIGHT = maze.cells[y][x + 1];
            const UP = maze.cells[y - 1][x];
            const DOWN = maze.cells[y + 1][x];

            switch (this.direction) {
                case 1: // esquerda
                    if (UP == WALL && DOWN == WALL) {
                        this.direction = 1;
                    } else {
                        this.paths = this.getPaths();
                        //this.paths = this.paths.filter(path => path != AGAINST[this.direction]);
                        log(this.paths);
                        //this.stop = true;
                        this.endMove = true;
                    }
                    break;
                case 2: // direita
                    if (UP == WALL && DOWN == WALL) {
                        this.direction = 2;
                    } else {
                        this.paths = this.getPaths();
                        //this.paths = this.paths.filter(path => path != AGAINST[this.direction]);
                        log(this.paths);
                        //this.stop = true;
                        this.endMove = true;
                    }
                    break;
                case 3: // cima
                    if (LEFT == WALL && RIGHT == WALL) {
                        this.direction = 3;
                    } else {
                        this.paths = this.getPaths();
                        //this.paths = this.paths.filter(path => path != AGAINST[this.direction]);
                        log(this.paths);
                        //this.stop = true;
                        this.endMove = true;
                    }
                    break;
                case 4: // baixo
                    if (LEFT == WALL && RIGHT == WALL) {
                        this.direction = 4;
                    } else {
                        this.paths = this.getPaths();
                        //this.paths = this.paths.filter(path => path != AGAINST[this.direction]);
                        log(this.paths);
                        //this.stop = true;
                        this.endMove = true;
                    }
                    break;
            }
        }
    }
}


function log(message) {
    console.log(message);
}


let ghosts = [
    new Ghost(BLOCK_SIZE * 9, BLOCK_SIZE * 11, 'red'),
    // new Ghost(BLOCK_SIZE * 8, BLOCK_SIZE * 9, 'green'),
    // new Ghost(BLOCK_SIZE * 9, BLOCK_SIZE * 9, 'purple'),
    // new Ghost(BLOCK_SIZE * 10, BLOCK_SIZE * 9, 'orange'),
];

function positionIsWall(xP, yP) {

    const CELLS = maze.cells;

    const topLeftX = Math.floor(xP / BLOCK_SIZE);
    const topLeftY = Math.floor(yP / BLOCK_SIZE);

    const topRightX = Math.floor((xP + pacman.radius * 2) / BLOCK_SIZE);
    const topRightY = topLeftY;

    const bottomLeftX = topLeftX;
    const bottomLeftY = Math.floor((yP + pacman.radius * 2) / BLOCK_SIZE);

    const bottomRightX = topRightX;
    const bottomRightY = bottomLeftY;

    return (
        CELLS[topLeftY][topLeftX] === 1 ||
        CELLS[topRightY][topRightX] === 1 ||
        CELLS[bottomLeftY][bottomLeftX] === 1 ||
        CELLS[bottomRightY][bottomRightX] === 1
    )
}


// keyboard events
document.addEventListener('keydown', function (event) {
    keys[event.key] = true; // Mark the key as pressed
});

document.addEventListener('keyup', function (event) {
    keys[event.key] = false; // Mark the key as released
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw() {
    clearCanvas();
    maze.draw();
    pacman.draw();
    ghosts.forEach(ghost => {
        ghost.draw();
    });
}


function update() {
    const SPEED = pacman.speed;
    if (keys['ArrowUp'] && !positionIsWall(pacman.xHitBox, pacman.yHitBox - SPEED)) {
        pacman.y -= SPEED;
        pacman.yHitBox -= SPEED;
        pacman.mouthDir = 3;
    }
    if (keys['ArrowDown'] && !positionIsWall(pacman.xHitBox, pacman.yHitBox + SPEED)) {
        pacman.y += SPEED;
        pacman.yHitBox += SPEED;
        pacman.mouthDir = 4;
    }
    if (keys['ArrowLeft'] && !positionIsWall(pacman.xHitBox - SPEED, pacman.yHitBox)) {
        pacman.x -= SPEED;
        pacman.xHitBox -= SPEED;
        pacman.mouthDir = 1;
    }
    if (keys['ArrowRight'] && !positionIsWall(pacman.xHitBox + SPEED, pacman.yHitBox)) {
        pacman.x += SPEED;
        pacman.xHitBox += SPEED;
        pacman.mouthDir = 2;
    }

    if (pacman.xHitBox > canvas.width) {
        pacman.x = 0;
        pacman.xHitBox = 0;
    } else if (pacman.xHitBox < 0) {
        pacman.x = canvas.width - pacman.radius * 2;
        pacman.xHitBox = canvas.width - pacman.radius * 2;
    }

    ghosts.forEach(ghost => {
        ghost.move();
    });
}

function activatePowerUp() {
    const SPEED = 5;
    ghosts.forEach(ghost => {
        // diminuir a velocidade padrão
        ghost.speed = SPEED;
        ghost.color = 'blue';
    });
}


function collidesWithGhost() {
    ghosts.forEach(ghost => {
        const distance = Math.sqrt(
            Math.pow(ghost.x - pacman.xHitBox, 2) +
            Math.pow(ghost.y - pacman.yHitBox, 2)
        );
    });
}


function collidesWithPellet(xP, yP) {
    const SMALL_PELLET = 4;
    const BIG_PELLET = 5;

    const CELLS = maze.cells;

    // Posição do centro de Pacman
    const centerX = xP + pacman.radius;
    const centerY = yP + pacman.radius;

    // Verificar em qual célula o centro de Pacman está
    const cellX = Math.floor(centerX / BLOCK_SIZE);
    const cellY = Math.floor(centerY / BLOCK_SIZE);

    // Verificar se o centro do Pacman colide com um pellet pequeno
    if (CELLS[cellY][cellX] === SMALL_PELLET) {
        CELLS[cellY][cellX] = 0;  // Remover o pellet pequeno
        score += 10;  // Aumentar a pontuação
        console.log("Pacman coletou um SMALL_PELLET!");
    }
    // Verificar se o centro do Pacman colide com um pellet grande
    else if (CELLS[cellY][cellX] === BIG_PELLET) {
        CELLS[cellY][cellX] = 0;  // Remover o pellet grande
        score += 50;  // Aumentar a pontuação
        console.log("Pacman coletou um BIG_PELLET!");
        activatePowerUp();  // Ativar o poder especial
    }
}


function loop() {
    draw();
    update();
    collidesWithPellet(pacman.x, pacman.y);
    requestAnimationFrame(loop);
}

loop();