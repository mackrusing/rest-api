// require helpers
const { readJsonFile } = require('../helpers/json-file-helpers');
const { validateUserObj } = require('../helpers/user-helper');

// require global variables
const constants = require('../global/constants');

/******************************************************************************/
/**                           validate object arrs                           **/
/******************************************************************************/

// validate user array
const validateUserArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // check for invalid user obj
    if (validateUserObj(arr[i])) {
      return false;
    }

    // check for duplicate id
    if (arr.filter((obj) => obj.id === arr[i].id).length > 1) {
      return false;
    }

    // check for duplicate login
    if (arr.filter((obj) => obj.login === arr[i].login).length > 1) {
      return false;
    }
  }

  // else valid user array
  return true;
};

/******************************************************************************/
/**                           validate json files                            **/
/******************************************************************************/

module.exports.validateJsonData = (req, res, next) => {
  const data = readJsonFile(constants.userFile);
  if (!validateUserArr(data)) {
    res.status(500).send(constants.dataErr);
  } else {
    next();
  }
};
