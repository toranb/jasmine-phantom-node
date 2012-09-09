var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app)
, directories = process.argv.slice(2)
, helper = require('./helper');

var helper = new Helper({directories: directories});

app.configure(function(){
  helper.addStaticDirectoryForEachSpec(app);
});

app.get('/', function(req, res) {
  res.send(helper.generateJasmineRunnerHtml());
});

exports.webserver = server;
