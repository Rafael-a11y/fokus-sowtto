const botaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const tarefas = JSON.parse(localStorage.getItem("token")) || [];
const array = [{nome: "rafael"}];
const ulTarefas = document.querySelector(".app__section-task-list");
const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");
const cancelarBt = document.querySelector(".app__form-footer__button--cancel");
let tarefaSelecionada = null;
let liTarefaSelecionada = null;
const limparFormulario = () =>
{
    textarea.value = "";
    formularioAdicionarTarefa.classList.add("hidden");
};
// const vetor = [];
// const pessoa = {nome: "Rafel", idade: 24};
// const pessoa2 = {nome:"israel", idade: 24}
// const pessoa3 = {nome:"Tirza", idade: 28}
// vetor.push(pessoa, pessoa2, pessoa3);
// localStorage.setItem("id", JSON.stringify(vetor));
// const novo = localStorage.getItem("id");
// console.log(novo);

function atualizarTarefas()
{
    localStorage.setItem("token", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa)
{
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");
    const svg = document.createElement("svg");
    svg.innerHTML = 
    `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
            fill="#01080E"></path>
        </svg>`;
    const paragrafo = document.createElement("p");
    paragrafo.classList.add("app__section-task-list-item-description");
    paragrafo.textContent = tarefa.descricao;
    const botao = document.createElement("button");
    botao.classList.add("app_button-edit");
    botao.onclick = () =>
    {
        // debugger;
        const novaDescricao = prompt("Qual a nova tarefa?", paragrafo.textContent) || paragrafo.textContent;
        paragrafo.textContent = novaDescricao;
        tarefa.descricao = novaDescricao;
        atualizarTarefas();
    } ;
    const imagemBotao = document.createElement("img");
    imagemBotao.setAttribute("src", "/imagens/edit.png");
    botao.append(imagemBotao);
    li.append(svg, paragrafo, botao);
    li.onclick = () =>
    {
        document.querySelectorAll(".app__section-task-list-item-active")
            .forEach(item =>
                {
                    item.classList.remove("app__section-task-list-item-active");
                });
        if(tarefaSelecionada === tarefa)
        {
            paragrafoDescricaoTarefa.textContent = "";
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        }
        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;
        // const ulItens = Array.from(ulTarefas.children);
        // OU
        // const ulItens = [...ulTarefas.children];
        // ulItens.forEach(item => 
        //     {
        //         item.classList.remove("app__section-task-list-item-active");
        //     });
        //     OU
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        li.classList.add("app__section-task-list-item-active");
    }
    return li;
}

botaoAdicionarTarefa.addEventListener("click", () =>
{
    formularioAdicionarTarefa.classList.toggle("hidden");
});

cancelarBt.addEventListener("click", limparFormulario);

formularioAdicionarTarefa.addEventListener("submit", (evento) =>
{
    evento.preventDefault();
    const tarefa = 
    {
        descricao: textarea.value,
    };
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.prepend(elementoTarefa);
    atualizarTarefas();
    textarea.value = "";
    formularioAdicionarTarefa.classList.add("hidden");
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.prepend(elementoTarefa);
});

document.addEventListener("FocoFinalisado", ()=>
{
    if(tarefaSelecionada && liTarefaSelecionada)
    {
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
        liTarefaSelecionada.querySelector("button").setAttribute("disabled", "true");
        // [...liTarefaSelecionada.children].forEach(item =>
        //     {
        //         if(item.classList.contains("app_button-edit")) item.setAttribute("disabled","true");
        //     });
    }
});
