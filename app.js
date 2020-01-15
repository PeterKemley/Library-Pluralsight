const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
// eslint-disable-next-line no-use-before-define
const debug = require('debug')('app');

const app = express();
const port = process.env.port || 4000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'books' },
        { link: '/Authors', title: 'Authors' }],
      title: 'Library'
    }
  );
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`Listening on port: ${port}`));
  debug(`Listening on port ${chalk.green(port)}`);
}).listen(port);
