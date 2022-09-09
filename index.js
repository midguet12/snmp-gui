const http = require('http');
const express = require('express');
const app = express();
const { appendFile } = require('fs');
var snmp = require('net-snmp');


const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));

//Session
var session = snmp.createSession("192.168.90.106", "");



app.get('/',function(req,res) {
  res.sendFile(__dirname + '/views/index.html');

});

app.get('/:oid', async (req, res) => {

  var oids = [req.params.oid]
  //rsvar oids = ["1.3.6.1.2.1.1.5.0"];
  console.log(oids)

  session.get (oids, function(error, varbinds){
    if (error) {
      console.log(error.message);

    } 
    else {
      for (let i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError (varbinds[i])) {
          console.error (snmp.varbindError (varbinds[i]));
        } else {
            console.log (varbinds[i].oid + " = " + varbinds[i].value);
        }
        
      } 
    }
    session.close();
  });

  
  //var string = oid;

  //res.status(200).send(JSON.stringify(string));
})


app.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);

});