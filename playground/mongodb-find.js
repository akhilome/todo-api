const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to connect to MongoDB Server');
  }
  console.log('Connected to mongodb server!');

  const db = client.db('TodoApp');

  /* db.collection('Todos').find({
    _id: new ObjectID('5b9ead5d3ead831ff800f6a4')
  }).toArray()
    .then( docs => {
      console.log('Todos');
      console.log(JSON.stringify(docs,undefined, 2));
    })
    .catch( err => {
      console.log('Unable to fetch todos', err);
    }); */

 /*  db.collection('Todos').find().count().then(count => {
    console.log(`Todos count: ${count}`);
  }).catch(err => {
    console.log('Unable to fetch todos', err);
  }); */

  db.collection('Users').find({
    name: 'Kizito Akhilome'
  }).toArray().then(docs => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch(err => {
    console.error(err);
  });
  
  /* db.collection('Users').find({
    name: 'Kizito Akhilome'
  }).map(doc => doc.name.split('').map(x => x.toUpperCase()).reverse().join('')).toArray().then(docs => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 4));
  }).catch(err => {
    console.error(err);
  });
   */
  // client.close();
});



