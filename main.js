
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tech'
})

const port = process.env.PORT || 3000;


module.exports = { app, connection };

const cartsApis = require('./apis/carts.js');
const itemsApis = require('./apis/items.js');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// welcome message
app.get('/', async (req, res) => {
  res.send('Hello Moataz')
});


// delete item from cart
app.delete('/cart/:id/delete', async (req, res) => {
  console.log('done')
  cartsApis.deleteFromCart(req, res);
});

// Get Items Endpoint
app.get('/items', async (req, res) => {
  itemsApis.listItems(req, res);
});

// Start Server
app.listen('3000', () => {
  console.log(`Started at pport >>>>>> ${port}`);
});
