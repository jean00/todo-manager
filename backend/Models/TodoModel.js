const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A todo must have a title'],
  },
  description: String,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
