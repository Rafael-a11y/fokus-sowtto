const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const inputMusica = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const startPauseIcon = document.querySelector("#start-pause>img");
const spanIniciarPausar = document.querySelector("#start-pause>span");
const tempoNaTela = document.querySelector("#timer");
// const bt = document.getElementById("start-pause");
// console.log(bt);
// const musicaAmbiente = document.createElement("audio");
// musicaAmbiente.setAttribute("src", "./sons/luna-rise-part-one.mp3");
const musicaAmbiente = new Audio("./sons/luna-rise-part-one.mp3");
const audioStart = new Audio("./sons/play.wav");
const audioPause = new Audio("./sons/pause.mp3");
const audioAlarme = new Audio("./sons/beep.mp3");
musicaAmbiente.loop = true;
let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

const contagemRegressiva = () =>
{
    if(tempoDecorridoEmSegundos <= 0)
    {
        // clearInterval(intervaloId);
        const focoAtivo = html.getAttribute("data-contexto") === "foco";
        if(focoAtivo)
        {
            //Cria evento do tipo FocoFinalisado e logo em seguida esse evento é despachado para os outros arquivos .js
            const evento = new CustomEvent("FocoFinalisado");
            document.dispatchEvent(evento);       
        }
        audioAlarme.play();
        zerar();
        alert("temporizador finalizado");
        return;
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
};

inputMusica.addEventListener("change", () =>
{
    if(musicaAmbiente.paused) musicaAmbiente.play();
    else musicaAmbiente.pause();
});

botaoFoco.addEventListener("click", ()=>
{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto("foco");
    botaoFoco.classList.add("active");
});
botaoCurto.addEventListener("click", ()=>
{
    tempoDecorridoEmSegundos = 300;
    alterarContexto("descanso-curto");
    botaoCurto.classList.add("active");
});
botaoLongo.addEventListener("click", ()=>
{
    tempoDecorridoEmSegundos = 900;
    alterarContexto("descanso-longo");
    botaoLongo.classList.add("active");
});

function alterarContexto(contexto)
{
    mostrarTempo();
    botoes.forEach((botao) => 
    {
        botao.classList.remove("active");
    });
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", "./imagens/" + contexto + ".png");
    switch(contexto)
    {
        case "foco": titulo.innerHTML = "Otimize sua produtividade,<br>" +
        "<strong class=app__title-strong>mergulhe no que importa.</strong>";
        break;

        case "descanso-curto": titulo.innerHTML = "Que tal dar uma respirada?<br>" +
        "<strong class=app__title-strong>Faça uma pausa curta.</strong>";
        break;

        case "descanso-longo": titulo.innerHTML = "Hora de voltar à superfície.<br>" +
        "<strong class=app__title-strong>Faça uma pausa longa.</strong>";
        break;
    }
}

startPauseBt.addEventListener("click", iniciarOuPausar);


function zerar()
{
    clearInterval(intervaloId);
    startPauseIcon.src = "./imagens/play_arrow.png";
    spanIniciarPausar.textContent = "Começar";
    intervaloId = null;
}

function iniciarOuPausar()
{
    if(intervaloId)
    {
        console.log("valor: " + intervaloId);
        audioPause.play();
        zerar();
        return;
    }
    if(!audioAlarme.paused) audioAlarme.pause();
    startPauseIcon.src = "./imagens/pause.png";
    spanIniciarPausar.textContent = "Pausar";
    audioStart.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function mostrarTempo()
{
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();