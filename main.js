const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");

botaoFoco.addEventListener("click", ()=>
{
    html.setAttribute("data-contexto", "foco");
    banner.setAttribute("src", "./imagens/foco.png");
});
botaoCurto.addEventListener("click", ()=>
{
    html.setAttribute("data-contexto", "descanso-curto");
    banner.setAttribute("src","./imagens/descanso-curto.png");
});
botaoLongo.addEventListener("click", ()=>
{
    html.setAttribute("data-contexto", "descanso-longo");
    banner.setAttribute("src", "./imagens/descanso-longo.png");
});


