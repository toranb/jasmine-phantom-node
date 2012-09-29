
An opinionated javascript test runner that is 100% browser-free

##What does this do exactly?

I wrote this to execute jasmine specs without a browser using phantom-js + node

##Why did you write another js test runner?

1. jasmine-node works if you don't throw a complex javascript library into your project
2. phantom-js works if you don't mind opening a browser or using js-test-driver
3. jasmine-phantom-node is the best of both => no browser, yet every spec is executed like a browser would

##How do I get started then?

First you need to install PhantomJS on your machine

http://phantomjs.org/

If you are using OSX you can use brew

    brew install phantomjs

If you are on Ubuntu you can use apt-get

    apt-get install phantomjs

Next you need to create a file named "phantom-runner.html" in the root of your project

Inside this file you will add anything your javascript tests require globally (ie- jQuery)

It's required to include the jasmine.js and jasmine-html.js files here along with a modern jQuery

Here is a very simple example of what this html file might look like

    <!DOCTYPE html>
    <html>
    <head>
    <title>javascript unit tests</title>
    <script src="/static/jasmine/jasmine.js"></script>
    <script src="/static/jasmine/jasmine-html.js"></script>
    <script src="/static/script/vendor/jquery-1.7.2.js"></script>
    </head>
    <body>
    </body>

The location of static/* should be the root asset directory of your webapp

For example, say I have a web app with this dir structure

    --project
      --webapp
        --static
          --script
            --tests
              --foo.spec.js

When you run this you need to pass in a directory or list of directories

The test runner will only add files with the extension .spec.js to the dom

With the example above you would tell the test runner to find and exec each spec under the tests directory like so

    node jasmine-phantom-node webapp/static/script/tests

The test runner will load each test directory recursively so avoid the following (results in duplicate specs being run)

    node jasmine-phantom-node webapp/static/script/tests/views webapp/static/script/tests/models

You will run the command above from the root of your project

At this time it's required to install this npm module locally -not globally

##What about these optional command line flags?

    --coffee will tell the test runner to compile any .spec.coffee files found in the directory
    --noColor simply removes the red/green color output (useful on your ci server)
    --junitreport at a future date this will generate a junit xml file with your test results
    --debug will tell the express web server to keep running so you can open the browser and debug your test code

##So what is missing from this test project today?

1. Include the full jasmine stacktrace in the test results
2. Include support for the junit xml reporting built into jasmine already
3. A pull request is needed for the npm project "phantomjs-node" to remove a few express warnings that shows up
4. Multi directory support (currently you can pass in more than 1 directory but it doesn't filter unique specs at this time)
