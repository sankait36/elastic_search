const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const search = require('./search');

const app = express();
const port = 3000;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PATCH, DELETE');
  next();
};

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(allowCrossDomain);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/search', async (req, res) => {
  const { term, offset } = req.query;
  search.queryTerm(term, offset)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/paragraphs', async(req, res) => {
  const { bookTitle, start, end } = req.query;
  search.getParagraphs(bookTitle, start, end)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));