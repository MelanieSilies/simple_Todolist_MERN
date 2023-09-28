const mongoose = require('mongoose');
const { Schema, model } = mongoose; 

const schema = new Schema({
  task: String,
  done: {
    type: Boolean,
    default: false
    }
});

const TodoModel = model('Todo', schema, 'todos');

module.exports = TodoModel; 
