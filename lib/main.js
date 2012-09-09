(function() {
var phantom = require('phantom')
, app = require('./app.js');

app.webserver.listen(8091);

phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open("http://localhost:8091", function(status) {
      return page.evaluate((function() {
        var results = $(document.body).find('.description')[0].text;
        var failures = $(document.body).find(".description:contains('0 failures')");
        if (failures.size() > 0) return "All tests passed! %@".fmt(results);

        var suite = $(document.body).find('.suite.failed').find('.description')[0].text;
        var name = $(document.body).find('.spec.failed').find('.description')[0].innerText;
        var error = $(document.body).find('.spec.failed').find('.resultMessage.fail')[0].innerText;
        return "%@ '%@ %@' %@".fmt(results, suite, name, error);
      }), function(result) {
        console.log(result);
        process.exit(code=0);
      });
    });
  });
});
}).call(this)
