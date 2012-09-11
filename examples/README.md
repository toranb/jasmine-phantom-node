##To run both the simple and complex examples

1. pull down this git repository 

    git clone https://github.com/toranb/jasmine-phantom-node.git

2. extract the example you want to work with

    mv sample ~/sample

3. install jasmine-phantom-node using npm in the root of the example

    cd ~/sample
    npm install jasmine-phantom-node

4. run the javascript tests in the project using jasmine-phantom-node from the root of the example

    node node_modules/jasmine-phantom-node/bin/jasmine-phantom-node webapp/static/tests
