const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

const newTodo = new Todo({
  text: 'Cook dinner'
});

// newTodo.save().then(doc => console.log('Saved todo: ', doc)).catch(err => {
//   console.error('Unable to save todo');
// });

const secondTodo = new Todo({
  text: 'Crush this',
  completed: true,
  completedAt: Date.now()
});

secondTodo.save()
  .then(doc => console.log('Saved: ', doc))
  .catch(err => console.log(err));


