const temporizadores = document.getElementsByClassName("app__card-timer");
const botoesAbas = document.getElementsByClassName("app__card-button");
const botaoTimer = document.getElementById("start-pause");
const iconeTimer = document.getElementsByClassName("app__card-primary-butto-icon")[0];
const span = document.querySelector("#start-pause>span");
const raiz = document.querySelector("html");
let isTimerEnable = false;
let temporizadorEmExecucao = false;
let temporizadorFocoAtivo = false;
let temporizadorDescansoCurtoAtivo = false;
let temporizadorDescancoLongoAtivo = false;
let tempoRestante;
let minutos;
let segundos;
let minutosProximaContagem = 25;
const audioPlay = document.getElementById("audio-play");
const audioPause = document.getElementById("audio-pause");
const audioAlarme = document.getElementById("audio-alarme");
const audioSomAmbiente = document.getElementById("audio-som-ambiente");

definirTemporizador(minutosProximaContagem);
for(let i = 0; i < botoesAbas.length; i++)
{
    botoesAbas[i].onclick = () => 
    {
        let botaoComfoco = document.querySelector(".active");
        if(!botoesAbas[i].classList.contains("active") && botaoComfoco)
        {
            const listaClasse = botoesAbas[i].classList;
            mudarCorFundo(listaClasse);
            if(temporizadorEmExecucao)
            {
                isTimerEnable = false;
                tocarAudio(2);
            } 
            removerFoco(botaoComfoco.classList);
            adicionarFoco(listaClasse);
            mudarTitulo(listaClasse);
            mudarImagem(listaClasse);
            if(!audioAlarme.paused) audioAlarme.pause();
            alterarBotaoTimer();
            adicionarTempo(listaClasse);
        }                      
    }
}
botaoTimer.addEventListener("click", (evento) => 
{
    isTimerEnable = (isTimerEnable === false ? true : false);
    alterarBotaoTimer();
    if(isTimerEnable)
    {
        tocarAudio(1);

        ativarTemporizador();
    } 
    else tocarAudio(2);
    
});

function adicionarFoco(listaClasse)
{
    const botaoFoco = document.querySelector(`.${listaClasse[1]}`);
    botaoFoco.classList.add("active");
}

function removerFoco(listaClasse)
{
    if(listaClasse.contains("active"))
    {
        listaClasse.remove("active");
    }
}

function mudarTitulo(listaClasse)
{
    const titulo = document.getElementsByClassName("app__title")[0];
    const strong = document.getElementsByClassName("app__title-strong")[0];
    if(verificaSeClasseExiste(listaClasse) === 0)
    {
        strong.innerHTML = "<strong class='app__title-strong'>Mergulhe no que importa.</strong>";
        titulo.innerHTML = "Otimize sua produtividade,<br>" + strong.innerHTML;
    }
    else if(verificaSeClasseExiste(listaClasse) === 1)
    {
        strong.innerHTML = "<strong class=app__title-strong>Faça uma pausa curta!</strong>";
        titulo.innerHTML = "Que tal dar uma respirada?<br>" + strong.innerHTML;
    }
    else if(verificaSeClasseExiste(listaClasse) === 2)
    {
        strong.innerHTML = "<strong class=app__title-strong>Faça uma pausa longa.</strong>";
        titulo.innerHTML = "Hora de voltar à superfície.<br>" + strong.innerHTML;
    }
}

function mudarImagem(listaClasse)
{
    const imagem = document.getElementsByClassName("app__image")[0];
    if(verificaSeClasseExiste(listaClasse) === 0)
    {
        imagem.src = "./imagens/foco.png";
    }
    else if(verificaSeClasseExiste(listaClasse) === 1)
    {
        imagem.src = "./imagens/descanso-curto.png";
    }
    else if(verificaSeClasseExiste(listaClasse) === 2)
    {
        imagem.src = "./imagens/descanso-longo.png";
    }
}

function mudarCorFundo(listaClasse)
{
    if(verificaSeClasseExiste(listaClasse)  === 0) raiz.dataset.contexto = "foco";
    else if(verificaSeClasseExiste(listaClasse) === 1) raiz.dataset.contexto = "descanso-curto";
    else if(verificaSeClasseExiste(listaClasse) === 2) raiz.dataset.contexto = "descanso-longo";
    raiz.style.background = "var(--main-bg-color)";
}

function adicionarTempo(listaClasse)
{         
    if(verificaSeClasseExiste(listaClasse) === 0){
        definirTemporizador(25);
    } 
    else if(verificaSeClasseExiste(listaClasse) === 1){
        definirTemporizador(5);
    } 
    else if(verificaSeClasseExiste(listaClasse) === 2){
        definirTemporizador(15);
    } 
}

function tocarAudio(number)
{
    if(number === 0) tocarAudioAlarme();
    else if(number === 1) tocarAudioPlay();
    else if(number === 2) tocarAudioPause();
    else tocarAudioSomAmbiente();
}

function tocarAudioPlay()
{
    if(!audioAlarme.paused) audioAlarme.pause();
    audioPlay.currentTime = 0;
    audioPlay.play();
}

function tocarAudioPause()
{
    if(!audioAlarme.paused) audioAlarme.pause();
    audioPause.currentTime = 0;
    audioPause.play();
}

function tocarAudioAlarme()
{
    audioAlarme.currentTime = 0;
    audioAlarme.play();
}

function tocarAudioSomAmbiente()
{
    audioSomAmbiente.currentTime = 0;
    audioSomAmbiente.play();
}

function pausarAudio()
{
    const audioSomAmbiente = document.getElementById("audio-som-ambiente");
    audioSomAmbiente.pause();

}

function alterarBotaoTimer()
{
    if(isTimerEnable)
    {
        iconeTimer.src = "./imagens/pause.png";
        span.textContent = "Pausar";
       
    } 
    else 
    {
        iconeTimer.src = "./imagens/play_arrow.png";
        span.textContent = "Começar";
    }  
}

function verificaSeClasseExiste(listaClasse)
{
    if(listaClasse.contains("app__card-button--foco")) return 0;
    else if(listaClasse.contains("app__card-button--curto")) return 1;
    else if(listaClasse.contains("app__card-button--longo")) return 2;
}   

function definirTemporizador(numMinutos) {
    
    // Define o tempo desejado em segundos (exemplo: 5 minutos)
    minutosProximaContagem = numMinutos;
    let tempoTotalSegundos = numMinutos * 60;

    tempoRestante = tempoTotalSegundos;
    atualizarTemporizador();
}

function atualizarTemporizador() {
    minutos = Math.floor(tempoRestante / 60);
    segundos = tempoRestante % 60;

    // Adiciona um zero à esquerda se for menor que 10
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Atualiza o conteúdo do elemento com id 'temporizador'
    for(let i = 0; i < temporizadores.length; i++)
    {
        if(temporizadores[i].dataset.contexto === raiz.dataset.contexto)
        {
            if(temporizadores[i].classList.contains("esconder"))
            {
                temporizadores[i].remove("esconder");
            }
            temporizadores[i].innerText = minutos + ":" + segundos;
        }
    }
}

function ativarTemporizador()
{
    temporizadorEmExecucao = true;
    // Atualiza o temporizador a cada segundo
    let temporizadorId = setInterval(function() {
        
        if (tempoRestante >= 1 && isTimerEnable === true) {
            tempoRestante--;
            atualizarTemporizador();
            
        } else if(tempoRestante >= 1 && isTimerEnable === false) {
            clearInterval(temporizadorId);
            temporizadorEmExecucao = false;
            console.log("Temporizador interrompido!");
        }
        else
        {
            clearInterval(temporizadorId);
            temporizadorEmExecucao = false;
            isTimerEnable = false;
            console.log("Temporizador CONCLUÍDO!");
            alterarBotaoTimer();
            definirTemporizador(minutosProximaContagem);
            tocarAudio(0);
        }
    }, 1000);
}