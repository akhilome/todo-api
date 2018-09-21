const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'akhilome@kizi.to',
  password: 'passwhat?',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'kizito@akhilo.me',
  password: 'passwhat?!'
}]

const todos = [
  { 
    _id: new ObjectID(), 
    text: 'First test todo' 
  },
  { 
    _id: new ObjectID(), 
    text: 'Second test todo', 
    completed: false, 
    completedAt: Date.now() 
  }
];

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
}

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      const userOnePromise = new User(users[0]).save();
      const userTwoPromise = new User(users[1]).save();

      return Promise.all([userOnePromise, userTwoPromise]);
    }).then(() => done());
};

module.exports = { todos, users, populateTodos, populateUsers };