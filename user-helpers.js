const fs = require('fs');

/******************************************************************************/
/**                               user helpers                               **/
/******************************************************************************/

/******************************************************************************/

// modify existing user
module.exports.modifyUser = (file, existingUser, modifierObj) => {
  // create new obj
  const newUser = {
    id: modifierObj.id ? modifierObj.id : existingUser.id,
    username: modifierObj.username
      ? modifierObj.username
      : existingUser.username,
    displayName: modifierObj.displayName
      ? modifierObj.displayName
      : existingUser.displayName,
  };
  // remove old user obj
  this.deleteUser(file, existingUser);
  // add new user obj
  console.log(newUser);
  console.log(this.readJsonFile('./users.json'));
  this.addUser(file, newUser);
};

/******************************************************************************/

/** General Helpers **/

// return object from json file
module.exports.readJsonFile = (file) => {
  return JSON.parse(fs.readFileSync(file, { encoding: 'utf8', flag: 'r' }));
};

// turn an object into json and write to file
module.exports.writeJsonFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

// filter array of objects by object property
module.exports.filterArrByProperty = (arr, property, value) => {
  let filteredArr = arr.filter((obj) => obj[property] === value);
  return filteredArr.length ? filteredArr[0] : null;
};

// remove object from array by object peoperty
module.exports.deleteObjByProperty = (arr, property, value) => {
  return arr.filter((obj) => obj[property] !== value);
};

/** User Helpers **/

// create user object from request body
module.exports.createUser = (reqBody) => {
  const { id, username, displayName } = reqBody;
  return {
    id: id,
    username: username,
    displayName: displayName,
  };
};

// validate user object is complete + has correct types
module.exports.validateUser = (user) => {
  if (
    Object.keys(user).length === 3 &&
    typeof user.id === 'string' &&
    typeof user.username === 'string' &&
    typeof user.displayName === 'string'
  ) {
    return true;
  } else {
    return false;
  }
};
