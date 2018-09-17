const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to connect to MongoDB Server');
  }
  console.log('Connected to mongodb server!');

  const db = client.db('TodoApp');

  // deleteMany
  /* db.collection('Todos').deleteMany({
    text: 'Eat breakfast'
  }).then(result => console.log(result)).catch(err => {
    console.error('Unable to delete docs', err);
  }); */

  // deleteOne
  /* db.collection('Todos').deleteOne({
    text: 'Eat breakfast'
  }).then(result => console.log(result)).catch(err => {
    console.log(err);
  }); */

  // findOneAndDelete
  /* db.collection('Todos').findOneAndDelete({
    completed: false
  }).then(result => console.log(result)).catch(err => {
    console.error(err);
  }); */

  /* db.collection('Users').deleteMany({
    name: 'Kizito Akhilome'
  }).then(res => console.log(res)).catch(err => console.error(err)); */

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5b9ebae9780aa6205046f95c')
  }).then(res => console.log(res)).catch(err => console.error(err));

  // client.close();
});



