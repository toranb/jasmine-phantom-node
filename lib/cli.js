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
    console.log("\nUSAGE: node jasmine-phantom-node [--coffee] [--noColor] [--junitreport] [--debug] directory\n");
    process.exit(code=1);
  };

  CliObject.prototype.getAvailableParams = function() {
    var color = true;
    var report = false;
    var debugging = false;
    var coffee = false;
    var specs = [];

    while(this.args.length) {
      var arg = this.args.shift();

      switch(arg)
      {
        case '--noColor':
          color = false;
          break;
        case '--debug':
          debugging = true;
          break;
        case '--coffee':
          coffee = true;
          break;
        case '--junitreport':
          report = true;
          break;
        default:
          specs.push(arg);
          break;
      }
    }

    return {showColor:color, showReport:report, debugOn: debugging, runSpecs: specs, compileCoffee: coffee};
  };

  return CliObject;
})();
