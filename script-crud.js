const botaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const tarefas = [];
botaoAdicionarTarefa.addEventListener("click", () =>
{
    formularioAdicionarTarefa.classList.toggle("hidden");
});

formularioAdicionarTarefa.addEventListener("submit", (evento) =>
{
    evento.preventDefault();
    const tarefa = 
    {
        descricao: textarea.value,
    };
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    
});