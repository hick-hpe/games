let contraMaquina = document.querySelector('.maquina')
let contraPlayer = document.querySelector('.dois-jogadores')

contraMaquina.onclick = () => {
    alert('Infelizmente, essa opção ainda não está disponível!')
    // localStorage.setItem('opcao', 'maquina')
    // window.open('index.html')
}

contraPlayer.onclick = () => {
    localStorage.setItem('opcao', 'player')
    window.location.href = 'index.html'
}
