// modules
const fs = require('fs');

/******************************************************************************/
/**                           alter array of users                           **/
/******************************************************************************/

// sort array of users by user id
module.exports.sortUserArr = (arr) => {
  arr.sort((a, b) => (a.id > b.id ? 1 : -1));
  return arr;
};

// add user to array of users
module.exports.addUser = (arr, user) => {
  arr.push(user);
  return arr;
};

// delete user from array of users
module.exports.deleteUser = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

// replace user from array of users
module.exports.replaceUser = (arr, index, newUser) => {
  arr.splice(index, 1, newUser);
  return arr;
};

/******************************************************************************/
/**                       filter through array of users                      **/
/******************************************************************************/

// find user by id
module.exports.findUserById = (arr, value) => {
  return arr.filter((obj) => obj.id === value)[0];
};

// find user by username
module.exports.findUserByUsername = (arr, value) => {
  return arr.filter((obj) => obj.username === value)[0];
};

// find index of user by id
module.exports.findUserIndexById = (arr, value) => {
  const index = arr.findIndex((obj) => obj.id === value);
  return index === -1 ? false : index;
};

module.exports.findUserIndexByUsername = (arr, value) => {
  const index = arr.findIndex((obj) => obj.username === value);
  return index === -1 ? false : index;
};

/******************************************************************************/
/**                                validation                                **/
/******************************************************************************/

// validate all users in array
module.exports.validateUserArr = (arr) => {
  // iterate through array
  let allIds = [];
  let allUsernames = [];
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

    // check for duplicate username
    for (let j = 0; j < allUsernames.length; j++) {
      if (arr[i].username === allUsernames[j]) {
        return false;
      }
    }
    allUsernames.push(arr[i].username);
  }
  return true;
};

// validate request query
module.exports.validateQuery = (query) => {
  if (
    Array.isArray(query.id) ||
    Array.isArray(query.username) ||
    (query.id && query.username)
  ) {
    return false;
  } else {
    return true;
  }
};

// validate user object is complete + has correct types
module.exports.validateUser = (user) => {
  // type checking
  if (
    Object.keys(user).length !== 3 ||
    typeof user.id !== 'string' ||
    typeof user.username !== 'string' ||
    typeof user.displayName !== 'string'
  ) {
    return false;
  }

  return true;
};

/******************************************************************************/
/**                                  checks                                  **/
/******************************************************************************/

// check if user shares unique properties with any existing users
module.exports.checkUniqUserProps = (arr, user) => {
  return (
    this.findUserById(arr, user.id) ||
    this.findUserByUsername(arr, user.username)
  );
};

/******************************************************************************/
/**                         write and read from file                         **/
/******************************************************************************/

// read json file + sort + return array of users
module.exports.readJsonFile = (file) => {
  const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
  return this.sortUserArr(data);
};

// sort array of users + write object to json file
module.exports.writeJsonFile = (file, data) => {
  data = this.sortUserArr(data);
  fs.writeFileSync(file, JSON.stringify(data));
};

/******************************************************************************/
/**                               user objects                               **/
/******************************************************************************/

// create user object from request body
module.exports.createUserObj = (reqBody) => {
  const { id, username, displayName } = reqBody;
  return {
    id: id,
    username: username.toLowerCase(),
    displayName: displayName,
  };
};

// update user object with partially complete request body
module.exports.updateUserObj = (exUser, reqBody) => {
  return {
    id: reqBody.id ? reqBody.id : exUser.id,
    username: reqBody.username ? reqBody.username : exUser.username,
    displayName: reqBody.displayName ? reqBody.displayName : exUser.displayName,
  };
};
