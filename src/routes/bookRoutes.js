const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
// const fs = require('fs');

const bookRouter = express.Router();
// const jsonContent = JSON.stringify('./credentials.json');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb+srv://Peter:peter12345@cluster0-24b5y.mongodb.net/test?retryWrites=true&w=majority';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      // eslint-disable-next-line max-len
      // MAKE MONGODB CONNECTION STRING AVAILABLE THROUGH A VARIABLE ADD CREDENTIAL FILE TO .GITIGNORE
      const url = 'mongodb+srv://Peter:peter12345@cluster0-24b5y.mongodb.net/test?retryWrites=true&w=majority';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}
module.exports = router;
