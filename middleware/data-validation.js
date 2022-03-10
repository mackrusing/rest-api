// require helpers
const { readJsonFile } = require('../helpers/json-file-helpers');

// require global variables
const constants = require('../global/constants');

/******************************************************************************/
/**                           validate object arrs                           **/
/******************************************************************************/

// validate user array
const validateUserArr = (arr) => {
  // iterate through array
  let allIds = [];
  let allLogins = [];
  for (let i = 0; i < arr.length; i++) {
    // check for invalid user obj
    if (!this.validateUser(arr[i])) {
      return false;
    }

    // check for duplicate id
    for (let j = 0; j < allIds.length; j++) {
      if (arr[i].id === allIds[j]) {
        return false;
      }
    }
    allIds.push(arr[i].id);

    // check for duplicate id2
    if (arr.filter((obj) => obj.id === arr[i].id).length > 1) {
      return false;
    }

    // check for duplicate logins
    for (let j = 0; j < allLogins.length; j++) {
      if (arr[i].login === allLogins[j]) {
        return false;
      }
    }
    allLogins.push(arr[i].logins);
  }
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
