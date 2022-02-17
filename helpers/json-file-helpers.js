// modules
const fs = require('fs');

// read json file + return object
module.exports.readJsonFile = (file) => {
  return JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
};

// write object to json file
module.exports.writeJsonFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};
