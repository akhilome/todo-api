const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then(doc => res.json(doc))
    .catch(err => res.status(400).json(err));
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.json({todos});
  }).catch(err => {
    res.status(400).json(err);
  });
});

app.get('/todos/:id', (req, res) => {
  const _id = req.params.id;
  
  if (!ObjectID.isValid(_id)) {
    return res.status(404).json({ error: "Invalid object id" });
  }

  Todo.findById({_id}).then(todo => {
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({todo});
  }).catch(err => {
    res.status(400).json({error: 'Something went wrong'});
  });
});

app.listen(3000, () => console.log('Running on port 3000'));

module.exports = { app };
