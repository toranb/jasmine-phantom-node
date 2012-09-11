var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app)
, directories = process.argv.slice(2)
, expressConfiguration = require('./expressConfiguration')
, jasmineMarkup = require('./jasmineMarkup');

var expressConfiguration = new ExpressConfiguration({directories: directories});
var jasmineMarkup = new JasmineMarkup({directories: directories});

app.configure(function(){
  expressConfiguration.makeStaticDirectoriesAvailable(app, express);
});

app.get('/', function(req, res) {
  res.send(jasmineMarkup.generateHtmlPage());
});

exports.webserver = server;
