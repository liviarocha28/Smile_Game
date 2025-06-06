// Variáveis globais
let nivel = 1;
let cartasTotal = 9;
let tentativasMax = 5;
let tentativas = tentativasMax;
let posicaoFlamingo;

const resposta = document.getElementById("resposta");
const btnJogarNovamente = document.getElementById("joganovamente");
const btnReiniciar = document.getElementById("reiniciar");

// Função para criar uma carta
function criarCarta(id) {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.id = id;
    carta.onclick = () => verifica(carta);
    return carta;
}

// Função para iniciar ou reiniciar o jogo
function iniciarJogo() {
    resposta.textContent = "";
    btnJogarNovamente.classList.add("invisivel");
    btnReiniciar.classList.add("invisivel");

    const cartasContainer = document.getElementById("cartas");
    cartasContainer.innerHTML = "";

    tentativas = tentativasMax;
    posicaoFlamingo = Math.floor(Math.random() * cartasTotal);

    for (let i = 0; i < cartasTotal; i++) {
        const carta = criarCarta(i);
        cartasContainer.appendChild(carta);
    }
}

// Verificação do clique
function verifica(carta) {
    const id = parseInt(carta.id);

    if (id === posicaoFlamingo) {
        carta.textContent = "🦩";
        carta.classList.add("acertou");
        resposta.textContent = `🎉 Acertou! Vamos para o próximo nível!`;
        encerrarJogo(true);
    } else {
        carta.textContent = "❌";
        carta.classList.add("errou");
        carta.onclick = null;
        tentativas--;

        if (tentativas > 0) {
            resposta.textContent = `Errou! Tentativas restantes: ${tentativas}`;
        } else {
            resposta.textContent = `😢 Fim de jogo! O flamingo estava em outra carta.`;
            revelarFlamingo();
            setTimeout(() => encerrarJogo(false), 800);
        }
    }
}

// Revela o flamingo após erro final
function revelarFlamingo() {
    const carta = document.getElementById(posicaoFlamingo);
    carta.textContent = "🦩";
    carta.classList.add("acertou");
}

// Encerramento do jogo
function encerrarJogo(acertou) {
    const cartas = document.querySelectorAll(".carta");
    cartas.forEach(c => c.onclick = null);

    btnJogarNovamente.classList.remove("invisivel");
    btnReiniciar.classList.remove("invisivel");

    btnJogarNovamente.textContent = acertou ? "Próximo nível" : "Tentar novamente";
}

// Botão: Próximo nível / Tentar novamente
btnJogarNovamente.onclick = () => {
    if (btnJogarNovamente.textContent === "Próximo nível") {
        nivel++;
        cartasTotal += 3;
        tentativasMax = Math.max(3, tentativasMax - 1);
    }
    iniciarJogo();
};

// Botão: Reiniciar jogo
btnReiniciar.onclick = () => {
    nivel = 1;
    cartasTotal = 9;
    tentativasMax = 5;
    iniciarJogo();
};

// Inicialização ao carregar
window.onload = iniciarJogo;

