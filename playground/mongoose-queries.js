const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const _id = '5b9fac642dfb222e10694e49';

if(!ObjectID.isValid(_id)) {
  return console.log('ID not valid');
}

/* Todo.find({_id}).then(todos => {
  console.log('Todos', todos);
}).catch(err => {
  console.log('Something went wrong', err);
});

Todo.findOne({_id}).then(todo => {
  console.log('Todo', todo);
}).catch(err => {
  console.log('Something went wrong', err);
});

Todo.findById(_id).then(todo => {
  if (!todo) return console.log('Id not found!');
  console.log('Todo', todo);
}).catch(err => {
  console.log('Something went wrong', err);
}); */


User.findById(_id).then(user => {
  if(!user) return console.log('No such user found');
  console.log('User', user);
}).catch(err => {
  console.error('Something went wrong', err);
});