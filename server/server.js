require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save()
    .then(doc => res.json(doc))
    .catch(err => res.status(400).json(err));
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id }).then(todos => {
    res.json({todos});
  }).catch(err => {
    res.status(400).json(err);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  const _id = req.params.id;
  
  if (!ObjectID.isValid(_id)) {
    return res.status(404).json({ error: "Invalid object id" });
  }

  Todo.findOne({_id, _creator: req.user._id}).then(todo => {
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({todo});
  }).catch(err => {
    res.status(400).json({error: 'Something went wrong'});
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  const _id = req.params.id;

  if (!ObjectID.isValid(_id)) {
    return res.status(404).json({ error: "Invalid object id" });
  }

  Todo.findOneAndDelete({_id, _creator: req.user._id}).then(todo => {
    if (!todo) return res.status(404).send();
    res.status(200).json({todo});
  }).catch(error => {
    res.status(400).json();
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const _id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(_id)) {
    return res.status(404).json({ error: "Invalid object id" });
  }
  
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id, _creator: req.user._id}, { $set: body }, { new: true }).then(todo => {
    if (!todo) return res.status(404).json();

    res.json({todo});
  }).catch(err => res.status(400).json());
});

app.post('/users', async (req, res) => {
  const user = new User(_.pick(req.body, ['email', 'password']));
  
  // Chaining promises
  /* user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).json({user});
  }).catch((err) => {
    res.status(400).json(err);
  }); */

  // Using async await
  try {
    const savedUser = await user.save();
    const token = await savedUser.generateAuthToken();
    res.header('x-auth', token).json({user});
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.post('/users/login', async (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  // Chaining Promises
  /* User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).json({user});
    })
  }).catch(err => res.status(400).json()); */

  // Using Async Await
  try {
    const confirmedUser = await User.findByCredentials(body.email, body.password);
    const token = await confirmedUser.generateAuthToken();
    res.header('x-auth', token).json({confirmedUser});
  } catch (err) {
    res.status(400).json();
  }
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).json();
  }, () => {
    res.status(400).json();
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = { app };
