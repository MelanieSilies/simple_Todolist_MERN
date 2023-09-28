const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const Todo = require('./Models/TodoModel.js');
const TodoModel = require('./Models/TodoModel.js');

const port = process.env.PORT || 3005;

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/todoliste', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/get', (req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    Todo.create({
        task: task
    })
    .then(result => {
        console.log('Aufgabe wurde erfolgreich gespeichert:', result);
        res.json(result);
    })
    .catch(err => {
        console.error('Fehler beim Speichern der Aufgabe:', err);
        res.status(500).json(err);
    })
});

app.put('/update/:id', (req,res) =>{
    const {id} = req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => {
        console.error(err); 
        res.status(500).json({ error: 'Ein Fehler ist aufgetreten.' });
      });
})

app.listen(port,() => {
    console.log('Server is running on port', port);
});
