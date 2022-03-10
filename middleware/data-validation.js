// require helpers
const { validateUserArr, readJsonFile } = require('../helpers/user-helpers');

// require global variables
const constants = require('../global/constants');

// validate json files
module.exports.validateJsonData = (req, res, next) => {
  const data = readJsonFile(constants.userFile);
  if (!validateUserArr(data)) {
    res.status(500).send(constants.dataErr);
  } else {
    next();
  }
};
