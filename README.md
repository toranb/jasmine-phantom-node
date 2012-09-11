
An opinionated javascript test runner that is 100% browser-free

##What does this do exactly?

I wrote this to execute jasmine specs without a browser using phantom-js + node

##Why did you write another js test runner?

1. jasmine-node works if you don't throw a complex javascript library into your project
2. phantom-js works if you don't mind opening a browser or using js-test-driver
3. jasmine-phantom-node is the best of both => no browser, yet every spec is executed like a browser would

##How do I get started then?

First you need to create a file named "phantom-runner.html" in the root of your project

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

Or if you have several spec directories for different parts of your webapp

    node jasmine-phantom-node webapp/static/script/tests webapp/static/script/integration

The test runner will load each test directory recursively so avoid the following

    node jasmine-phantom-node webapp/static/script/tests/views webapp/static/script/tests/models

You will run the command above from the root of your project

At this time it's required to install this npm module locally -not globally

##So what is missing from this test project today?

1. Add the full stacktrace that jasmine-html shows when a spec fails
2. Add support for the junit xml reporting built into jasmine already
3. Maybe a feature to 'roll-back' / reset the dom after each test
4. No high-level functional tests to show it in action end-to-end
5. Real-world adoption to ensure the phantom-js runtime is browser-like
6. A pull request is needed for the npm project I lean on (phantomjs-node) to fix an issue showing up when tests run (regarding express)
