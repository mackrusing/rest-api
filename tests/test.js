const { readFile } = require('./user-helpers');

const data = readFile('./users.json');

console.log(data);
