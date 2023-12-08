// callback asynchronous example

// file system module from Node.js
const fs = require('fs');

// relative path to file
const filePath = './file.txt';

// callback
const callback = (error, data) => {
  if (error) {
    console.log('An error occurred...: ', error);
  } else {
    console.log(data); // Hi, developers!
    console.log('Done!');
  }
};

// async request to read a file
//
// parameter 1: filePath
// parameter 2: encoding of utf-8
// parmeter 3: callback function
fs.readFile(filePath, 'utf-8', callback);

console.log("I'm the last line of the file!");
