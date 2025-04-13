const bodyParser = require('body-parser');
require('dotenv').config();
console.log("Hello World");

let express = require('express');
const req = require('express/lib/request');
let app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
});

app.use(bodyParser.urlencoded({extended: false})).get('/name', (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
}).post('/name', (req, res) => {
  res.json({ name:`${req.body.first} ${req.body.last}` })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', 
express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({"message": message});
});

 module.exports = app;
