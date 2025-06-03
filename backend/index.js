const express = require('express');
const uuid = require('uuid');
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));


const tarefas = [
    {
        id:1,
        titulo:"Fazer atividade de XP",
        completa: false
    },
    {
        id:2,
        titulo:"Estudar Node",
        completa: false
    },
    {
        id:3,
        titulo:"Entregar relatório de vendas",
        completa: true
    },
]

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/tarefas', (req, res) =>{
    res.json(tarefas);
})

app.get('/tarefas/:id', (req, res) => {
    let tarefa = tarefas.filter((tarefa) => tarefa.id == req.params.id);
    res.json({msg: "1 tarefa", data: tarefa });
})

app.post('/tarefas', (req, res) => {
    tarefas.push({ id:uuid.v4(), ...req.body});
    res.json({msg: "tarefa criada", data: tarefas});
})

app.put('/tarefas/:id', (req, res) => {
    let tarefa = tarefas.find((t) => t.id == req.params.id);
    
    if (tarefa) {
        tarefa.titulo = req.body.titulo;
        tarefa.completa = req.body.completa;
        res.json({msg: "tarefa atualizada", data: tarefas});
    }else {
        res.json({msg: "tarefa não encontrada"});
    }
})

app.delete('/tarefas/:id', (req, res) => {
    let index = tarefas.findIndex((tarefa) => tarefa.id == req.params.id);
    tarefas.splice(index, 1);
    res.json({msg: "tarefa deletada", data: tarefas});
})

app.listen(PORT, () =>{
    console.log(`App rodando na porta ${PORT}`);
})