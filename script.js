// Inicializa uma variável que armazenará os dados das cartelas e jogadores.
var cartelas = [];

// Inicializa uma variável que armazenará o status do jogo.
var jogoAtivo = false;

function geraNumeroAleatorio (valorMinimo, valorMaximo) {
    return Math.floor(Math.random() * (valorMaximo - valorMinimo) + valorMinimo);
}

function geraNumerosAleatorios (tamanho, valorMinimo, valorMaximo) {
    var numeros = [];

    // Enquanto o Array não atingir o tamanho especificado, faça.
    while (numeros.length < tamanho) {
        // Gera um número aleatório.
        var numeroAleatorio = geraNumeroAleatorio(valorMinimo, valorMaximo);
        // Verifica se esse número não existe no Array, caso não exista, será inserido.
        if (!numeros.includes(numeroAleatorio)){
            numeros.push(numeroAleatorio);
        }
    }
    // Retorna a listagem dos números.
    return numeros;
}

function geraCartela () {

    // Verifica se o jogo está acontecendo.
    if (jogoAtivo) {
        alert('Você não pode gerar cartelas enquanto o jogo estiver acontecendo.');
        return;
    }

    // Solicita o nome do jogador.
    var nomeJogador = prompt('Digite o nome do jogador.');
    if(nomeJogador.length <=2) {
        alert('O nome do jogador não pode ser menor que três caracteres.');
        return;
    }

    // Gera números aleatórios.
    var numeros = []
    numeros.push(geraNumerosAleatorios(5, 1, 15));
    numeros.push(geraNumerosAleatorios(5, 16, 30));
    numeros.push(geraNumerosAleatorios(5, 31, 45));
    numeros.push(geraNumerosAleatorios(5, 46, 60));
    numeros.push(geraNumerosAleatorios(5, 61, 75));

    // Insere a cartela na página HTML.
    var cartelaHTML = geraCartelaHTML(nomeJogador, numeros);

    // Armazena esses dados na variável global.
    var cartela = {
        nomeJogador: nomeJogador,
        cartela: cartelaHTML,
        jaJogou: false
    }
    cartelas.push(cartela); 

}

function geraCartelaNovamente(cartela) {
    // Gera números aleatórios.
    var numeros = []
    numeros.push(geraNumerosAleatorios(5, 1, 15));
    numeros.push(geraNumerosAleatorios(5, 16, 30));
    numeros.push(geraNumerosAleatorios(5, 31, 45));
    numeros.push(geraNumerosAleatorios(5, 46, 60));
    numeros.push(geraNumerosAleatorios(5, 61, 75));

    // Seleciona a div da cartela. (tbody (cartela) > table > div)
    var divCartela = cartela.cartela.parentElement.parentElement;

    // Remove cartela existente.
    divCartela.remove();

    // Insere a cartela na página HTML.
    var cartelaHTML = geraCartelaHTML(cartela.nomeJogador, numeros);

    // Armazena a nova cartela na variável global.
    cartela.cartela = cartelaHTML;

}

function geraCartelaHTML (nomeJogador, numeros) {

    // Seleciona a div que armazena todas as cartelas.
    var divCartelas = document.querySelector('#cartelas');

    // Cria uma nova div para a cartela.
    var div = document.createElement('div')
    div.classList.add('cartela');

    // Cria uma nova div para o cabeçalho da cartela.
    var divCabecalho = document.createElement('div');
    divCabecalho.classList.add('cabecalho-cartela');
    divCabecalho.classList.add('flex-container');
    div.appendChild(divCabecalho);

    // Cria o título com nome do jogador.
    var h3 = document.createElement('h3');
    h3.innerText = nomeJogador;
    divCabecalho.appendChild(h3);

    // Cria o botão para remover.
    var button = document.createElement('button');
    button.classList.add('button-normal');
    button.innerHTML = '<i class="fa-solid fa-trash"></i>';
    button.setAttribute('onclick', 'removeCartela(this.parentElement.parentElement)');
    divCabecalho.appendChild(button);              

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
                td.innerHTML = '<i class="fa-solid fa-star"></i>';
                td.classList.add('preenchido');
            } else {
                td.innerText = numeros[coluna][linha];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // Adiciona a div criada à div que armazena todas as cartelas.
    divCartelas.appendChild(div);

    // Retorna o tbody da cartela.
    return tbody;

}

function removeCartela(divCartela) {

    // Verifica se o jogo está acontecendo.
    if (jogoAtivo) {
        alert('Você não pode excluir uma cartela quanto o jogo está acontecendo.');
        return;
    }

    // Confirma se o usuário deseja deletar a cartela.
    var confirmacao = confirm('Deseja deletar essa cartela? Essa ação não pode ser desfeita.');
    
    // Caso sele cancele a operação, retornar.
    if (confirmacao == false && interno == (false || null)) {
        return;
    }

    // Seleciona a lista com todas as cartelas.
    var divCartelas = document.querySelector('#cartelas');

    // Pega a posição da tabela no HTML.
    var posicao = Array.prototype.indexOf.call(divCartelas.children, divCartela);
    
    // Exclui o cadastro do jogador.
    cartelas.pop(cartelas[posicao]);

    // Remove a cartela do HTML.
    divCartela.remove();
}

function removeCartelas() {

    // Verifica se o jogo está ativo.
    if (jogoAtivo) {
        alert('Você não pode deletar todas as cartelas enquanto o jogo estiver acontecendo.');
        return;
    }

    // Confirma se a pessoa quer deletar todas as cartelas.
    var confirmacao = confirm('Deseja deletar todas as cartelas? Essa ação não pode ser desfeita.');
    if (confirmacao == false) {
        return;
    }
 
    // Limpa o Array que armazena os dados das cartelas e jogadores.
    cartelas = [];

    // Seleciona a div que armazena todas as cartelas.
    var divCartelas = document.querySelector('#cartelas');

    // Seleciona todas as cartelas do jogo.
    var cartelasHTML = document.querySelectorAll('#cartelas > div');

    // Remove todas elas do HTML.
    cartelasHTML.forEach(function (cartela) {
            divCartelas.removeChild(cartela);
        }
    );

}

function removeNumerosSorteados() {
    // Seleciona a div que armazena os números sorteados.
    var divNumerosSorteados = document.querySelector('#numeros-sorteados');
    var numerosSorteados = document.querySelectorAll('#numeros-sorteados > div');

   numerosSorteados.forEach(function (numeroSorteado) {
        divNumerosSorteados.removeChild(numeroSorteado);
    });
}

function removeGanhador () {
    // Seleciona a div que armazena o ganhador.
    var divGanhador = document.querySelector('#ganhador');

    // Remove a div da página, caso exista.
    if (divGanhador != null) {
        divGanhador.remove();
    }

}

function preencheCartelas(numeroSorteado) {

    // Seleciona todas as células das tabelas que ainda não estão preenchidas.
    var celulasTabela = document.querySelectorAll('td:not(.preenchido)');

    // Itera pelas células verificando se o número sorteado é equivalente ao número dentro da célula.
    for (let i = 0; i < celulasTabela.length; i++) {
        const celula = celulasTabela[i];
        if (numeroSorteado == celula.innerText) {
            celula.classList.add('preenchido');
        }
    }

}

function verificaGanhador() {
    
    // Para cada cartela.
    for (let numeroCartela = 0; numeroCartela < cartelas.length; numeroCartela++) {

        const cartela = cartelas[numeroCartela];
        const tbody = cartela.cartela;
        const linhas = tbody.childNodes;

        var celulasPreenchidasColuna = [0, 0, 0, 0, 0];
        var celulasPreenchidasDiagonal1 = 0;
        var celulasPreenchidasDiagonal2 = 0;

        const posicoesDiagonal1 = [ [0,0], [1,1], [2,2], [3,3], [4,4] ];
        const posicoesDiagonal2 = [ [0,4], [1,3], [2,2], [3,1], [4,0] ];

        // Para cada linha da tabela.
        for (let numeroLinha = 0; numeroLinha < linhas.length && jogoAtivo; numeroLinha++) {

            const linha = linhas[numeroLinha];
            const celulas = linha.childNodes;
            var celulasPreenchidas = 0;

            // Para cada coluna da tabela.
            for (let numeroColuna = 0; numeroColuna < celulas.length; numeroColuna++) {

                const celula = celulas[numeroColuna];
                const posicao = [numeroLinha, numeroColuna];
                
                // Verifica se a célula está preenchida.
                if (celula.classList.contains('preenchido')){
                    celulasPreenchidas++;
                    celulasPreenchidasColuna[numeroColuna] += 1;
                    // Verifica se a célula preenchida faz parte de uma das diagonais.
                    if (JSON.stringify(posicoesDiagonal1).includes(JSON.stringify(posicao))) {
                        celulasPreenchidasDiagonal1++;
                    } 
                    if (JSON.stringify(posicoesDiagonal2).includes(JSON.stringify(posicao))) {
                        celulasPreenchidasDiagonal2++;
                    }
                }

                // Se o número de células preenchidas for igual a 5, declara o ganhador e encerra o jogo.
                if ((celulasPreenchidas == 5) || 
                    (celulasPreenchidasColuna[numeroColuna] == 5)|| 
                    (celulasPreenchidasDiagonal1 == 5) || 
                    (celulasPreenchidasDiagonal2 == 5)
                ) {

                    jogoAtivo = false;
                    exibeGanhador(cartela);
                    return;
                }

            }
        }
    }}

function exibeNumeroSorteado(numero) {

    // Seleciona a div que armazena os números sorteados.
    var divNumerosSorteados = document.querySelector('#numeros-sorteados');

    // Cria uma nova div para exibir o número.
    var divNumero = document.createElement('div');
    divNumero.classList.add('numero-sorteado');

    // Cria um elemento para informar a coluna do número sorteado.
    var coluna = document.createElement('p');

    // Define o texto da coluna sorteada de acordo com o intervalo do número.
    if (numero <= 15) {
        coluna.innerText = 'B';
        coluna.classList.add('coluna-b');
    } else if (numero > 15 && numero <= 30) {
        coluna.innerText = 'I';
        coluna.classList.add('coluna-i');
    } else if (numero > 30 && numero <= 45) {
        coluna.innerText = 'N';
        coluna.classList.add('coluna-n');
    } else if (numero > 45 && numero <= 60) {
        coluna.innerText = 'G';
        coluna.classList.add('coluna-g');
    } else if (numero > 60 && numero <= 75) {
        coluna.innerText = 'O';
        coluna.classList.add('coluna-o');
    }

    // Insere a informação da coluna dentro da div.
    divNumero.appendChild(coluna);

    // Insere o número que foi sorteado em formato de texto.
    var numeroTexto = document.createElement('p');
    numeroTexto.innerText = numero;
    divNumero.appendChild(numeroTexto);

    // Insere a div contendo o número e coluna dentro da divNumerosSorteados.
    divNumerosSorteados.insertBefore(divNumero, divNumerosSorteados.firstChild);

}

function esmaecerHTML(elemento) {  
    var opacidade = 0; 
    var intervalo = setInterval(
        function () {
            if (opacidade >= 1) {
                clearInterval(intervalo);
                return;
            }

            opacidade += 0.1;
            elemento.style.opacity = opacidade;
        },
        50
    );
}

function exibeGanhador(cartela) {

    // Verifica se a div já existe na página.
    var divGanhador = document.querySelector('#ganhador');

    if (divGanhador == null) {
        // Cria a div principal da mensagem de alerta.
        var divGanhador = document.createElement('div');
        divGanhador.id = 'ganhador';

        // Adiciona um ícone de troféu
        var iconeTrofeu = '<i class="fa-solid fa-trophy"></i>';
        divGanhador.innerHTML = iconeTrofeu;

        // Cria a div que armazena os textos.
        var divMensagem = document.createElement('div');
        divMensagem.id = 'ganhador-mensagem';
        divGanhador.appendChild(divMensagem);

        // Cria o título da mensagem.
        var h3 = document.createElement('h3');
        h3.innerText = 'Já temos um ganhador!';
        divMensagem.appendChild(h3);

        // Cria o parágrafo da mensagem.
        var paragrafo = document.createElement('p');
        divMensagem.appendChild(paragrafo);

        // Insere na página.
        var main = document.querySelector('main');
        esmaecerHTML(main.insertBefore(divGanhador, main.firstChild));

    } else {
        // Seleciona o parágrafo em que a mensagem será colocada.
        var paragrafo = document.querySelector('#ganhador-mensagem > p');
    }

    // Insere a mensagem.
    paragrafo.innerText = `Parabéns, ${cartela.nomeJogador}! Você foi o primeiro a completar o padrão. :)`;

}

function iniciaJogo() {

    // Verifica se o jogo já não foi iniciado.
    if (jogoAtivo) {
        alert('Você não pode iniciar um jogo enquanto outro estiver acontecendo.');
        return;
    }

    // Verifica se existem, no mínimo, duas cartelas para iniciar o jogo.
    if(cartelas.length < 2) {
        alert('São necessários, no mínimo, dois jogadores para iniciar o jogo.');
        return;
    }

    // Remove os números sorteados em outra rodada.
    removeNumerosSorteados();

    // Remove o ganhador da outra rodada.
    removeGanhador();

    // Se jogadores já jogaram, gerar uma nova cartela. Caso ainda não tenham jogado, alterar variável global.
    cartelas.forEach(
        function (cartela) {
            if (cartela.jaJogou) {
                geraCartelaNovamente(cartela);
            } 
            cartela.jaJogou = true;
        }
    )

    // Altera texto do botão de Iniciar Jogo.
    var botaoJogar = document.querySelector('#botao-jogar');
    botaoJogar.innerText = 'Jogar Novamente';

    // Seleciona outros botões de ação.
    var botaoAdicionar = document.querySelector('#botao-adicionar');
    var botaoLimpar = document.querySelector('#botao-limpar');

    // Desabilita temporariamente os botões de jogar, adicionar e excluir.
    botaoJogar.setAttribute('disabled', 'disabled');
    botaoAdicionar.setAttribute('disabled', 'disabled');
    botaoLimpar.setAttribute('disabled', 'disabled');

    // Define que o jogo está ativo.
    jogoAtivo = true;

    // Inicializa a variável que armazena os números sorteados durante o jogo.
    var numerosSorteados = [];

    // Em um intervalo de 500ms, executa uma função responsável por rodar o jogo.
    var intervalo = setInterval(
        function () {
            // Se o jogo não estiver ativo, limpe o intervalo e reative os botões.
            if (jogoAtivo == false) {
                clearInterval(intervalo);
                botaoJogar.removeAttribute('disabled');
                botaoAdicionar.removeAttribute('disabled');
                botaoLimpar.removeAttribute('disabled');
            }

            // Gera um número aleatório enquanto não tiver atingido o número máximo.
            if (numerosSorteados.length <= 75) {
                // Gera um número aleatório.
                var numeroAleatorio = geraNumeroAleatorio(1, 75);
    
                // Verifica se esse número não existe no Array, caso não exista, será inserido.
                if (!numerosSorteados.includes(numeroAleatorio)){
                    numerosSorteados.push(numeroAleatorio);
                    exibeNumeroSorteado(numeroAleatorio);
                    preencheCartelas(numeroAleatorio);
                    verificaGanhador();
                }
            }
        },
        500
    );
}