const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

// eslint-disable-next-line no-useless-escape
// const jsonContent = JSON.stringify(fs.readFileSync('./credential.json'));

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }];

// eslint-disable-next-line no-unused-vars
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      // eslint-disable-next-line max-len
      // MAKE MONGODB CONNECTION STRING AVAILABLE THROUGH A VARIABLE ADD CREDENTIAL FILE TO .GITIGNORE
      const url = 'mongodb+srv://Peter:peter12345@cluster0-24b5y.mongodb.net/test?retryWrites=true&w=majority';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          res.send('Inserting Books!');
          res.end();
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
