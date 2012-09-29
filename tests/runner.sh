#!/bin/bash

npm install jasmine-node
npm install colors
npm install coffee-script

for file in *; do
  if [ ${file: -8} == ".spec.js" ]; then
    ../node_modules/jasmine-node/bin/jasmine-node "$file"
  fi
done
