let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let aparencia = 2

        let imagemSprite = new Image();
        imagemSprite.src = "img/sprites.png";

        const player = {
            x: 50,
            y: 300,
            width: 50,
            height: 50,
            color: 'blue',
            speed: 3,
            movingUp: false,
            movingDown: false,
            movingLeft: false,
            movingRight: false,
        };

        function update() {

            if (player.movingUp && player.y > 0) {
                aparencia = 11
                player.y -= player.speed;
                ctx.drawImage(
                    imagemSprite, 50, 0, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

            if (player.movingDown && player.y + player.height < canvas.height) {
                aparencia = 2
                player.y += player.speed;
                ctx.drawImage(
                    imagemSprite, 50, 0, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

            if (player.movingRight && player.x + player.width < canvas.width) {
                aparencia = 8
                player.x += player.speed;
                ctx.drawImage(
                    imagemSprite, 50, 0, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

            if (player.movingLeft && player.x > 0) {
                aparencia = 5
                console.log(aparencia)
                player.x -= player.speed;
                ctx.drawImage(
                    imagemSprite, 50, 0, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

        }

        function draw() {
            // Limpa o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // player
            // let xCentro = (canvas.width / 2) - (player.width / 2)
            // let yCentro = (canvas.height / 2) - (player.height / 2)

            // de frente
            if (aparencia == 2) {
                ctx.drawImage(
                    imagemSprite, 50, 0, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

            // esquerda
            if (aparencia == 5) {
                ctx.drawImage(
                    imagemSprite, 50, 48, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

            // direita
            if (aparencia == 8) {
                ctx.drawImage(
                    imagemSprite, 50, 96, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }

            // de costas
            if (aparencia == 11) {
                ctx.drawImage(
                    imagemSprite, 50, 145, player.width, player.height,
                    player.x, player.y, player.width, player.height
                )
            }
        }

        function soltouTecla(event) {

            if (event.key === 'ArrowUp') {
                aparencia = 11
                player.movingUp = false;
            }

            if (event.key === 'ArrowDown') {
                aparencia = 2
                player.movingDown = false;
            }

            if (event.key === 'ArrowRight') {
                aparencia = 8
                player.movingRight = false;
            }

            if (event.key === 'ArrowLeft') {
                aparencia = 5
                player.movingLeft = false;
            }

        }

        function apertouTecla(event) {

            if (event.key === 'ArrowUp') {
                player.movingUp = true;
            }

            if (event.key === 'ArrowDown') {
                player.movingDown = true;
            }

            if (event.key === 'ArrowRight') {
                player.movingRight = true;
            }

            if (event.key === 'ArrowLeft') {
                player.movingLeft = true;
            }
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Adiciona ouvintes de eventos ao documento
        document.addEventListener('keydown', apertouTecla);
        document.addEventListener('keyup', soltouTecla);

        gameLoop()