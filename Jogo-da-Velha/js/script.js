let canvas = document.querySelector('canvas')
let contexto = canvas.getContext('2d');
let ladoQuadrado = canvas.width
canvas.height = canvas.width
let vezDoJogador = decideQuemComeca()
let imagemSimbolo = new Image()
imagemSimbolo.src = vezDoJogador == "X" ? "img/simbolo_X.png" : "img/simbolo_O.png"
let tabela = [
    '', '', '', '', '', '', '', '', '',
]
let cor = 'black'

function desenharLinha(cor, x0, y0, x, y) {
    contexto.lineWidth = 5;
    contexto.strokeStyle = cor;

    contexto.beginPath();
    contexto.moveTo(x0, y0);
    contexto.lineTo(x, y);
    contexto.stroke();
}

function criarAsLinhasDivisorias() {

    // Desenhe uma linha
    desenharLinha(cor, ladoQuadrado / 3, 0, ladoQuadrado / 3, ladoQuadrado);
    desenharLinha(cor, ladoQuadrado * 2 / 3, 0, ladoQuadrado * 2 / 3, ladoQuadrado);
    desenharLinha(cor, 0, ladoQuadrado / 3, ladoQuadrado, ladoQuadrado / 3);
    desenharLinha(cor, 0, ladoQuadrado * 2 / 3, ladoQuadrado, ladoQuadrado * 2 / 3);

}

function decideQuemComeca() {
    return Math.floor(Math.random() * 2) == 1 ? "X" : "O";
}

function verificarEmQualCasaFoiClicada(mouseX, mouseY) {
    if (mouseX <= ladoQuadrado / 3) {
        if (mouseY <= ladoQuadrado / 3) {
            return 1
        } else if (mouseY <= ladoQuadrado * 2 / 3) {
            return 4
        } else {
            return 7
        }
    } else if (mouseX <= ladoQuadrado * 2 / 3) {
        if (mouseY <= ladoQuadrado / 3) {
            return 2
        } else if (mouseY <= ladoQuadrado * 2 / 3) {
            return 5
        } else {
            return 8
        }
    } else {
        if (mouseY <= ladoQuadrado / 3) {
            return 3
        } else if (mouseY <= ladoQuadrado * 2 / 3) {
            return 6
        } else {
            return 9
        }
    }
}

function tentarPreencherCasa() {
    if (tabela[casaClicada - 1]) {
        alert("Esta casa já foi preenchida!")
    } else {
        desenharSimbolo(casaClicada)
        vezDoJogador = vezDoJogador == "X" ? "O" : "X"
        imagemSimbolo.src = vezDoJogador == "X" ? "img/simbolo_X.png" : "img/simbolo_O.png"
        tabela[casaClicada - 1] = vezDoJogador
        document.querySelector('span').textContent = vezDoJogador
    }
}

function verificarVitoria(numCasasPreenchidas) {

    let linha = horizontal()
    let coluna = vertical()
    let diagonalP = diagonalPrincipal()
    let diagonalS = diagonalSecundaria()

    console.log(linha)
    console.log(coluna)
    console.log(diagonalP)
    console.log(diagonalS)

    if (linha[0]) {
        let vencedor = linha[2] == "X" ? "O" : "X"
        desenharVitoria(linha, "linha")
    } else if (coluna[0]) {
        let vencedor = coluna[2] == "X" ? "O" : "X"
        desenharVitoria(coluna, "coluna")
    } else if (diagonalP[0]) {
        let vencedor = diagonalP[1] == "X" ? "O" : "X"
        desenharVitoria(diagonalP, "diagonalP")
    } else if (diagonalS[0]) {
        let vencedor = diagonalS[1] == "X" ? "O" : "X"
        desenharVitoria(diagonalS, "diagonalS")
    } else if (numCasasPreenchidas == 9) {
        document.querySelector('span').textContent = "Deu velha"
        canvas.removeEventListener('click', cliqueNocanvas)
    }
}

function horizontal() {
    let venceu = false
    let indice = 0
    let simbolo = ""
    for (let i = 0; i < 9; i += 3) {
        let a = (tabela[i] == tabela[i + 1] && tabela[i + 1] == tabela[i + 2])
        let b = (tabela[i] + tabela[i + 1] + tabela[i + 2]).length == 3
        let c = a && b
        if (c) {
            venceu = true
            simbolo = tabela[i]
            break
        }
        indice++
    }
    return [venceu, indice, simbolo]
}

function vertical() {
    let venceu = false
    let indice = 0
    let simbolo = ""
    for (let i = 0; i < 3; i++) {
        let a = (tabela[i] == tabela[i + 3] && tabela[i + 3] == tabela[i + 6])
        let b = (tabela[i] + tabela[i + 3] + tabela[i + 6]).length == 3
        let c = a && b
        if (c) {
            venceu = true
            simbolo = tabela[i]
            break
        }
        indice++
    }
    return [venceu, indice, simbolo]
}

function diagonalPrincipal() {
    return [
        (
            tabela[0] == tabela[4] && tabela[4] == tabela[8] &&
            (tabela[0] + tabela[4] + tabela[8]).length == 3
        ), tabela[0]
    ]
}

function diagonalSecundaria() {
    return [
        (
            tabela[2] == tabela[4] && tabela[4] == tabela[6] &&
            (tabela[2] + tabela[4] + tabela[6]).length == 3
        ), tabela[2]
    ]
}

function desenharVitoria(lista, ondeVenceu) {
    if (lista.length == 3) {
        if (ondeVenceu == "linha") {
            // linha
            if (lista[1] == 0) {
                desenharLinha('#FF0000', ladoQuadrado / 10, ladoQuadrado / 6, ladoQuadrado * 9 / 10, ladoQuadrado / 6);
            } else if (lista[1] == 1) {
                desenharLinha('#FF0000', ladoQuadrado / 10, ladoQuadrado / 2, ladoQuadrado * 9 / 10, ladoQuadrado / 2);
            } else {
                desenharLinha('#FF0000', ladoQuadrado / 10, ladoQuadrado * 5 / 6, ladoQuadrado * 9 / 10, ladoQuadrado * 5 / 6);
            }
        } else {
            // coluna
            if (lista[1] == 0) {
                desenharLinha('#FF0000', ladoQuadrado / 6, ladoQuadrado / 10, ladoQuadrado / 6, ladoQuadrado * 9 / 10);
            } else if (lista[1] == 1) {
                desenharLinha('#FF0000', ladoQuadrado / 2, ladoQuadrado / 10, ladoQuadrado / 2, ladoQuadrado * 9 / 10);
            } else {
                desenharLinha('#FF0000', ladoQuadrado * 5 / 6, ladoQuadrado / 10, ladoQuadrado * 5 / 6, ladoQuadrado * 9 / 10);
            }
        }
    } else {
        if (ondeVenceu == "diagonalP") {
            desenharLinha('#FF0000', ladoQuadrado / 10, ladoQuadrado / 10, ladoQuadrado * 9 / 10, ladoQuadrado * 9 / 10);
        } else {
            desenharLinha('#FF0000', ladoQuadrado * 9 / 10, ladoQuadrado / 10, ladoQuadrado / 10, ladoQuadrado * 9 / 10);
        }
    }
    canvas.removeEventListener('click', cliqueNocanvas)
    vezDoJogador = vezDoJogador == "X" ? "O" : "X"
    document.querySelector('span').textContent = "Jogador " + vezDoJogador + " venceu!!!"
}

function cliqueNocanvas(event) {
    // Obtenha as coordenadas do clique
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // Exiba as coordenadas no console (opcional)
    console.log('Posição do clique:', mouseX, mouseY);

    casaClicada = verificarEmQualCasaFoiClicada(mouseX, mouseY);

    tentarPreencherCasa()

    let numCasasPreenchidas = 0
    let tabelaPrintada = ""
    for (let i = 1; i <= tabela.length; i++) {
        if (tabela[i] != "") {
            numCasasPreenchidas++
        }
        tabelaPrintada += tabela[i - 1] + " ";
        if (i % 3 == 0) {
            tabelaPrintada += "\n"
        }
    }

    console.log(tabelaPrintada)
    console.log("numCasasPreenchidas: " + numCasasPreenchidas)

    verificarVitoria(numCasasPreenchidas)
}

function desenharSimbolo(casaClicada) {
    let escala = 2
    let imgX, imgY
    switch (casaClicada) {
        case 1:
            imgX = (ladoQuadrado / 6) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 2:
            imgX = (ladoQuadrado / 2) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 3:
            imgX = (ladoQuadrado * 5 / 6) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 4:
            imgX = (ladoQuadrado / 6) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4 + ladoQuadrado / 3
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 5:
            imgX = (ladoQuadrado / 2) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4 + ladoQuadrado / 3
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 6:
            imgX = (ladoQuadrado * 5 / 6) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4 + ladoQuadrado / 3
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        // =======================================================
        case 7:
            imgX = (ladoQuadrado / 6) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4 + ladoQuadrado / 1.5
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 8:
            imgX = (ladoQuadrado / 2) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4 + ladoQuadrado / 1.5
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        case 9:
            imgX = (ladoQuadrado * 5 / 6) - (imagemSimbolo.width / 4)
            imgY = ladoQuadrado / 6 - imagemSimbolo.height / 4 + ladoQuadrado / 1.5
            contexto.drawImage(
                imagemSimbolo,
                0, 0, imagemSimbolo.width, imagemSimbolo.height,
                imgX, imgY, imagemSimbolo.width / escala, imagemSimbolo.height / escala
            )
            break
        default:
            break
    }
}

function iniciarJogo() {

    criarAsLinhasDivisorias()

    // quem comeca
    document.querySelector('span').textContent = vezDoJogador

    // identificar onde clicou no canvas
    canvas.addEventListener('click', cliqueNocanvas)

    // reiniciar game
    document.querySelector('button').addEventListener('click', () => {
        location.reload()
    })
}

iniciarJogo()
