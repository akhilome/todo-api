const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

// Todo Model 
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

/* const secondTodo = new Todo({
  text: 'Crush this',
  completed: true,
  completedAt: Date.now()
});

secondTodo.save()
  .then(doc => console.log('Saved: ', doc))
  .catch(err => console.log(err)); */


// User Model
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

const firstUser = new User({
  email: 'kizito@akhilo.me'
});

firstUser.save()
  .then(doc => console.log('Saved user: ', doc))
  .catch(err => console.error('Unable to add user to db', err));

