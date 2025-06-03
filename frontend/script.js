// const { log } = require("console");

const todoContainer = document.querySelector(".todo-container");
const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");

const modalBG = document.querySelector(".modal-background");
const closeModal = document.querySelector("#close-modal");
const editarNomeTarefa = document.getElementById("edit-todo-name");
const editarTarefaCompleta = document.getElementById("edit-todo-completed");
const saveTodo = document.getElementById("save-todo")

let todoArray = [];

const URL = "http://localhost:3333/tarefas";

async function get_tarefas(){
    try{
        const resp = await fetch(URL);
        const data = await resp.json();
        return data;
    }catch(err){
        return err
    }
}

async function adicionar_tarefa() {
    try{
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: inputTodo.value,
                completa: false,
            })
        };
        const resp = await fetch(URL, options);
        const data = await resp.json();
        return data;
    }catch (err){
        return err;
    }
}

async function deletar_tarefa(tarefasElem) {
    try{
        const del_url = URL + "/" + tarefasElem.id;

        console.log(del_url);
        const resp = await fetch(del_url, {
            method: "DELETE",
        });

        const data = await resp.json();
        return data;

    }catch(err){
        return err
    }
}

async function editar_tarefa(tarefasElem) {
    try{
        let edit_url = URL + "/" + tarefasElem.id;

        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: tarefasElem.id,
                titulo: editarNomeTarefa.value,
                completa: editarTarefaCompleta.checked,
            })
        };
        const resp = await fetch(edit_url, options);
        const data = await resp.json();
        return data;
    }catch (err){
        return err;
    }
}

function open_modal(tarefasElem){
    editarNomeTarefa.value = tarefasElem.titulo;
    editarTarefaCompleta.checked = tarefasElem.completa;
    modalBG.style.display = "block";
    closeModal.addEventListener("click", ()=> {
        modalBG.style.display = "none";
    });
    saveTodo.addEventListener("click", () =>{
        modalBG.style.display = "none";
        editar_tarefa(tarefasElem);
    });
}

function display_Tarefas(todoArr){
    todoArr.forEach((tarefasElem) => {
        console.log(tarefasElem);

        // Superclasse
        let tarefas = document.createElement("div");
        tarefas.classList.add("todo");

        // classesfilhas
        let tarefasInfo = document.createElement("div");
        tarefasInfo.classList.add("todo-info");
        let tarefasBtn = document.createElement("form");
        tarefasBtn.classList.add("todo-btn");

        // 

        let tarefasCompletas = document.createElement("input");
        tarefasCompletas.classList.add("todo-completed");
        tarefasCompletas.setAttribute("type", "checkbox");
        tarefasCompletas.checked = tarefasElem.completa;
        let todoName = document.createElement("p");
        todoName.classList.add("todo-titulo");
        todoName.innerHTML = tarefasElem.titulo;

        let todoEdit = document.createElement("button");
        todoEdit.classList.add("todo-editar");
        todoEdit.innerHTML = "Editar";
        todoEdit.addEventListener("click", e =>{
            e.preventDefault();
            console.log("Open modal");
            open_modal(tarefasElem);
        });

        let todoDel = document.createElement("button");
        todoDel.classList.add("todo-deletar");
        todoDel.innerHTML = "Deletar";
        todoDel.addEventListener("click", e => {
            console.log("Delete Todo")
            deletar_tarefa(tarefasElem);
        });
        
        tarefasInfo.appendChild(tarefasCompletas);
        tarefasInfo.appendChild(todoName);
        tarefasBtn.appendChild(todoEdit);
        tarefasBtn.appendChild(todoDel);

        tarefas.appendChild(tarefasInfo);
        tarefas.appendChild(tarefasBtn);

        todoContainer.appendChild(tarefas);
    })
}

get_tarefas()
.then((todoArr) => {
    todoArray = todoArr;
    console.log(todoArray);
    display_Tarefas(todoArray)
})
.catch((err) => console.log(err));

addTodo.addEventListener("click", () =>{
    if(inputTodo.value != ""){
        adicionar_tarefa();
    }
});