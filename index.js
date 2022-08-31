const http = require('http');
const express = require('express');
const app = express();
const { appendFile } = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));


app.get('views/index.html', (req, res) => {
  
})


server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);

});