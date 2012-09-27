Cli = (function() {

  var CliObject = function(params) {
    this.args = params.args;
  };

  CliObject.prototype.parseCommandLineArgs = function() {
    if (this.args.length === 0) {
      this.haltProcessWithUsage();
    }else{
      return this.availableParams();
    }
  };

  CliObject.prototype.availableParams = function() {
    var params = this.getAvailableParams();
    if (params.runSpecs.length === 0) {
      this.haltProcessWithUsage();
    }
    return params;
  };

  CliObject.prototype.haltProcessWithUsage = function() {
    console.log("USAGE: node jasmine-phantom-node [--noColor] [--junitreport] directory || directory, directory\n");
    process.exit(code=1);
  };

  CliObject.prototype.getAvailableParams = function() {
    var color = true;
    var report = false;
    var specs = [];

    while(this.args.length) {
      var arg = this.args.shift();

      switch(arg)
      {
        case '--noColor':
          color = false;
          break;
        case '--junitreport':
          report = true;
          break;
        default:
          specs.push(arg);
          break;
      }
    }

    return {showColor:color, showReport:report, runSpecs: specs};
  };

  return CliObject;
})();
