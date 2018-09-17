const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to connect to MongoDB Server');
  }
  console.log('Connected to mongodb server!');

  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b9f567c423dc4131112e6fb')
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then(res => console.log(res)).catch(err => console.log(err));

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b9ebaad780aa6205046f95b')
  }, {
    $set: { name: 'Kizito' },
    $inc: { age: -19 }
  }, {
    returnOriginal: false
  }).then(res => console.log(res)).catch(err => console.error(err));

  // client.close();
});



