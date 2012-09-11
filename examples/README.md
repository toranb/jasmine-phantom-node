#To run both the simple and complex examples

##Pull down this git repository 
    git clone https://github.com/toranb/jasmine-phantom-node.git

##Extract the example you want to work with
    mv simple ~/simple

##Install jasmine-phantom-node using npm in the root of the example
    cd ~/simple
    npm install jasmine-phantom-node

##Run the javascript tests in the project using jasmine-phantom-node from the root of the example
    node node_modules/jasmine-phantom-node/bin/jasmine-phantom-node webapp/static/tests