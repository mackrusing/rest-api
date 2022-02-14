const fs = require('fs');

// write data
const writeFile = (file, data) => {
  fs.writeFile(file, JSON.stringify(data), (err) => {
    // check for error
    if (err) {
      throw err;
    }
  });
};

// read data
module.exports.readJsonFile = (file) => {
  return JSON.parse(fs.readFileSync(file, { encoding: 'utf8', flag: 'r' }));
};

module.exports.writeJsonFile = (file, data) => {
  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
};

/******************************************************************************/
/**                               user helpers                               **/
/******************************************************************************/

// find user object by id
module.exports.getUserById = (file, id) => {
  // retrieve data from file
  const data = this.readJsonFile(file);
  // iterate through data + check for id
  const matchingUser = data.filter((user) => user.id === id);
  // return value
  return matchingUser.length ? matchingUser[0] : null;
};

// find user object by username
module.exports.getUserByUsername = (file, username) => {
  // retrieve data from file
  const data = this.readJsonFile(file);
  // iterate through data + check for username
  const matchingUser = data.filter((user) => user.username === username);
  // return value
  return matchingUser.length ? matchingUser[0] : null;
};

// validate user object
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

// check for existing user
module.exports.checkForExistingUser = (file, user) => {
  const { id, username } = user;
  if (this.getUserById(file, id) || this.getUserByUsername(file, username)) {
    return true;
  } else {
    return false;
  }
};

// create user object from request body
module.exports.createUser = (reqBody) => {
  const { id, username, displayName } = reqBody;
  return {
    id: id,
    username: username,
    displayName: displayName,
  };
};

// add user to file
module.exports.addUser = (file, user) => {
  // retrieve data from file
  const data = this.readJsonFile(file);
  // add user to data
  data.push(user);
  // write data to file
  writeFile(file, data);
};

// replace existing user from file
module.exports.replaceUser = (file, user) => {};

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

// delete user from file
module.exports.deleteUser = (file, user) => {
  // retrieve data from file
  const data = this.readJsonFile(file);
  // remove user from data
  const modifiedData = data.filter(
    (existingUser) => existingUser.id !== user.id
  );
  // write data to file
  writeFile(file, modifiedData);
};
