// Inicializa uma variável que armazenará os dados das cartelas e jogadores.
var cartelas = [];

function geraNumerosAleatorios (tamanho, valorMinimo, valorMaximo) {
    var numeros = [];

    // Enquanto o Array não atingir o tamanho especificado, faça.
    while (numeros.length < tamanho) {
        // Gera um número aleatório.
        var numeroAleatorio = Math.floor(Math.random() * (valorMaximo - valorMinimo) + valorMinimo);
        // Verifica se esse número não existe no Array, caso não exista, será inserido.
        if (!numeros.includes(numeroAleatorio)){
            numeros.push(numeroAleatorio);
        }
    }
    // Retorna a listagem dos números.
    return numeros;
}

function geraCartela () {
    // Solicita o nome do jogador.
    var nomeJogador = prompt('Digite o nome do jogador.');

    // Gera números aleatórios.
    var numeros = []
    numeros.push(geraNumerosAleatorios(5, 0, 15));
    numeros.push(geraNumerosAleatorios(5, 16, 30));
    numeros.push(geraNumerosAleatorios(5, 31, 45));
    numeros.push(geraNumerosAleatorios(5, 46, 60));
    numeros.push(geraNumerosAleatorios(5, 61, 75));

    // Insere a cartea na página HTML.
    geraCartelaHTML(nomeJogador, numeros);

    // Armazena esses dados na variável global.
    var cartela = {
        nomeJogador: nomeJogador,
        numeros: numeros
    }
    cartelas.push(cartela); 
}

function geraCartelaHTML (nomeJogador, numeros) {
    // Seleciona a div que armazena todas as cartelas.
    var divCartelas = document.querySelector('#cartelas');

    // Cria uma nova div para a cartela.
    var div = document.createElement('div')
    div.classList.add('cartela');

    // Cria o título com nome do jogador.
    var h3 = document.createElement('h3');
    h3.innerText = nomeJogador;
    div.appendChild(h3);

    // Cria o elemento básico de tabela e seu cabeçalho.
    var table = document.createElement('table');
    table.innerHTML = '<thead><tr><td>B</td><td>I</td><td>N</td><td>G</td><td>O</td></tr></thead>';
    div.appendChild(table);

    // Cria o body da tabela
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Cria as linhas da tabela
    for (let linha = 0; linha < 5; linha++) {
        var tr = document.createElement('tr');
        for (let coluna = 0; coluna < 5; coluna++) {
            var td = document.createElement('td');
            if (linha == 2 && coluna == 2) {
                td.innerText = 'X';
            } else {
                td.innerText = numeros[coluna][linha];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // Adiciona a div criada à div que armazena todas as cartelas.
    divCartelas.appendChild(div);
}