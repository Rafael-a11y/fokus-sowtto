const html = document.querySelector("html");
const botaoFoco = document.querySelector(".app__card-button--foco");
const botaoCurto = document.querySelector(".app__card-button--curto");
const botaoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");

botaoFoco.addEventListener("click", ()=>
{
    alterarContexto("foco");
});
botaoCurto.addEventListener("click", ()=>
{
    alterarContexto("descanso-curto");
});
botaoLongo.addEventListener("click", ()=>
{
    alterarContexto("descanso-longo");
});

function alterarContexto(contexto)
{
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", "./imagens/" + contexto + ".png");
}


