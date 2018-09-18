const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Removes all todos
/* Todo.deleteMany({}).then(result => {
  console.log(result);
}); */


// Todo.findByIdAndRemove
/* Todo.findByIdAndDelete('5ba1024aa672dc3f6284a65a').then(todo => {
  console.log(todo);
}); */


// Todo.findOneAndRemove
Todo.findOneAndDelete({_id: '5ba103bfa672dc3f6284a660'}).then(todo => {
  console.log(todo);
});

