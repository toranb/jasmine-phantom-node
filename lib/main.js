(function() {
var phantom = require('node-phantom')
, app = require('./app.js')
, args = process.argv.slice(2)
, cli = require('./cli')
, processResults = require('./processResults');

var cli = new Cli({args: args}).parseCommandLineArgs();

app.webserver.listen(8091);

phantom.create(function(err, ph) {
  return ph.createPage(function(err, page) {
    return page.open("http://localhost:8091", function(err, status) {
      return page.evaluate((function() {
        try {
          var results = $(document.body).find('.description')[0].text;
          var failures = $(document.body).find(".description:contains(' 0 failures')");
          if (failures.size() > 0) return "All tests passed! " + results;

          var suite = $(document.body).find('.suite.failed').find('.description')[0].text;
          var name = $(document.body).find('.spec.failed').find('.description')[0].innerText;
          var error = $(document.body).find('.spec.failed').find('.resultMessage.fail')[0].innerText;
          return results + ' \nSuite: "' + suite + '"\nTest: "' + name + '"\n' + error;
        } catch(err) {
          return "Failed to load the jasmine html test runner";
        }
      }), function(err, result) {
        new ProcessResults(cli).logResultsToTheConsole(result);
      });
    });
  });
});
}).call(this)
