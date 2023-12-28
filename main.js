const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const inputMusica = document.querySelector("#alternar-musica");
const musicaAmbiente = new Audio("./sons/luna-rise-part-one.mp3");
musicaAmbiente.loop = true;


inputMusica.addEventListener("change", () =>
{
    if(musicaAmbiente.paused) musicaAmbiente.play();
    else musicaAmbiente.pause();
});

botaoFoco.addEventListener("click", ()=>
{
    alterarContexto("foco");
    botaoFoco.classList.add("active");
});
botaoCurto.addEventListener("click", ()=>
{
    alterarContexto("descanso-curto");
    botaoCurto.classList.add("active");
});
botaoLongo.addEventListener("click", ()=>
{
    alterarContexto("descanso-longo");
    botaoLongo.classList.add("active");
});

function alterarContexto(contexto)
{
    botoes.forEach((botao) => 
    {
        console.log(botoes.length);
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
    const result = true;

    titulo.textContent = `'c' ${result ? "added" : "removed"}; classList is now "${titulo.classList}".`;
}


