var express = require('express')
, http = require('http')
, app = express()
, server = http.createServer(app)
, args = process.argv.slice(2)
, cli = require('./cli')
, expressConfiguration = require('./expressConfiguration')
, jasmineMarkup = require('./jasmineMarkup')
, coffee = require('./coffee');

var cli = new Cli({args: args}).parseCommandLineArgs();

if (cli.compileCoffee) {
  var coffee = new Coffee({directories: cli.runSpecs}).compileEachCoffeeSpecFile();
}
var expressConfiguration = new ExpressConfiguration({directories: cli.runSpecs});
var jasmineMarkup = new JasmineMarkup({directories: cli.runSpecs});

app.configure(function(){
  expressConfiguration.makeStaticDirectoriesAvailable(app, express);
});

app.get('/', function(req, res) {
  res.send(jasmineMarkup.generateHtmlPage());
});

exports.webserver = server;
