let nivel = 1;
let tentativasMax = 5;
let cartasTotal = 9;
let tentativas = tentativasMax;
let posicaoFlamingo = 0;

const container = document.getElementById("cartas");
const resposta = document.getElementById("resposta");
const btnJogarNovamente = document.getElementById("joganovamente");
const btnReiniciar = document.getElementById("reiniciar");

function iniciarJogo() {
    container.innerHTML = "";
    tentativas = tentativasMax;
    posicaoFlamingo = Math.floor(Math.random() * cartasTotal);

    for (let i = 0; i < cartasTotal; i++) {
        const carta = document.createElement("div");
        carta.id = i;
        carta.className = "carta inicial";
        carta.textContent = "?";
        carta.onclick = () => verifica(carta);
        container.appendChild(carta);
    }

    resposta.textContent = `Nível ${nivel} — Você tem ${tentativas} tentativas.`;
    btnJogarNovamente.classList.add("invisivel");
    btnReiniciar.classList.add("invisivel");
}

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
            encerrarJogo(false);
        }
    }
}

function revelarFlamingo() {
    const carta = document.getElementById(posicaoFlamingo);
    carta.textContent = "🦩";
    carta.classList.add("acertou");
}

function encerrarJogo(acertou) {
    const cartas = document.querySelectorAll(".carta");
    cartas.forEach(c => c.onclick = null);

    btnJogarNovamente.classList.remove("invisivel");
    btnReiniciar.classList.remove("invisivel");

    btnJogarNovamente.textContent = acertou ? "Próximo nível" : "Tentar novamente";
}

btnJogarNovamente.onclick = () => {
    if (btnJogarNovamente.textContent === "Próximo nível") {
        nivel++;
        cartasTotal += 3; // aumenta a quantidade de cartas
        tentativasMax = Math.max(3, tentativasMax - 1); // diminui tentativas até mínimo de 3
    }
    iniciarJogo();
};

btnReiniciar.onclick = () => {
    nivel = 1;
    cartasTotal = 9;
    tentativasMax = 5;
    iniciarJogo();
};

window.onload = iniciarJogo;
